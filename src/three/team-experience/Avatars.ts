import gsap from 'gsap'
import type GUI from 'lil-gui'
import * as THREE from 'three'

import type TeamExperience from '.'
import type Debug from '../utils/Debug'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'

export default class Avatars {
  canvas: HTMLCanvasElement

  scene: THREE.Scene

  camera: Camera

  renderer: Renderer

  sizes: Sizes

  time: Time

  debug: Debug

  debugFolder: GUI | null = null

  count: number

  cards: HTMLDivElement[]

  texture: THREE.Texture

  points: THREE.Points | null = null

  geometry: THREE.BufferGeometry | null = null

  material: THREE.ShaderMaterial | null = null

  sphereMaterial: THREE.MeshBasicMaterial | null = null

  radius = 6

  rotate = true

  axisPrimary: THREE.Vector3

  axisSecondary: THREE.Vector3

  shownGroup: number[] = []

  hiddenGroup: number[] = []

  shownOpacity = 1

  hiddenOpacity = 1

  opacity = 1

  constructor(teamExperience: TeamExperience) {
    this.canvas = teamExperience.canvas
    this.camera = teamExperience.camera
    this.scene = teamExperience.scene
    this.renderer = teamExperience.renderer
    this.debug = teamExperience.debug
    this.time = teamExperience.time
    this.sizes = teamExperience.sizes

    this.count = 30
    this.cards = Array(this.count)

    this.texture = new THREE.Texture()

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Points')
    }

    this.axisPrimary = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize()

    this.axisSecondary = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize()

    this.generate()

    this.sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xd71488,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
      wireframeLinewidth: 10
    })
    this.points!.add(new THREE.Mesh(new THREE.SphereGeometry(5, 32, 16), this.sphereMaterial))
  }

  generate() {
    if (this.points !== null) {
      this.geometry!.dispose()
      this.material!.dispose()
      this.scene.remove(this.points)
    }

    this.geometry = new THREE.BufferGeometry()

    const index = new Float32Array(this.count).map((_value, i) => i)
    const positions = new Float32Array(this.count * 3)
    const offsets = new Float32Array(this.count * 2)
    const opacities = new Float32Array(this.count * 1).fill(this.opacity)

    const tilesX = 8
    const tilesY = 4

    index.forEach((i) => {
      const phi = Math.PI * (1 + Math.sqrt(5)) * i
      const theta = Math.acos(1 - (2 * i) / this.count)

      positions[i * 3 + 0] = this.radius * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = this.radius * Math.cos(theta)
      positions[i * 3 + 2] = this.radius * Math.sin(theta) * Math.sin(phi)

      offsets[i * 2 + 0] = (i % tilesX) / tilesX
      offsets[i * 2 + 1] = Math.floor(i / tilesX) / tilesY
    })

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('aIndex', new THREE.BufferAttribute(index, 1))
    this.geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 2))
    this.geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1))

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uSize: { value: 800 * this.renderer.instance!.getPixelRatio() },
        uTexture: { value: this.texture },
        uScale: { value: new THREE.Vector2(1 / tilesX, 1 / tilesY) }
      },
      vertexShader: `
        uniform float uSize;
        
        attribute vec2 aOffset;
        attribute float aOpacity;
        
        varying vec2 vOffset;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;

          gl_PointSize = uSize;
          gl_PointSize *= -1.0 / viewPosition.z;

          vOffset = aOffset;
          vOpacity = aOpacity;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uScale;

        varying vec2 vOffset;
        varying float vOpacity;
        
        void main() {
          vec2 uv = vec2(gl_PointCoord.x * uScale.x + vOffset.x, (1.0 - gl_PointCoord.y) * uScale.y + vOffset.y);
          gl_FragColor = texture2D(uTexture, uv);
          if (gl_FragColor.a < 0.5) discard;
          gl_FragColor.a *= vOpacity;
          if (gl_FragColor.a == 0.0) discard;
        }
      `
    })

    const textureLoader = new THREE.TextureLoader()
    textureLoader.load('/images/avatars.png', (texture) => {
      this.texture = texture
      this.texture.needsUpdate = true
      this.material!.uniforms.uTexture.value = this.texture
    })

    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
  }

  resize() {
    const scale = window.screen.orientation.type.startsWith('portrait')
      ? 400
      : window.innerWidth > 1440
      ? 800
      : window.innerWidth > 1080
      ? 600
      : window.innerWidth > 720
      ? 400
      : 350

    const size = scale * this.renderer.instance!.getPixelRatio()

    this.material!.uniforms.uSize.value = size

    if (this.shownGroup.length > 0) this.showAll()
  }

  update() {
    if (this.rotate) {
      this.points!.rotateOnAxis(this.axisPrimary, 0.005)
      this.axisPrimary.applyAxisAngle(this.axisSecondary, Math.sin(this.time.elapsed / 1000) * 0.01)
    }

    const opacities = this.geometry!.getAttribute('aOpacity').array as Float32Array
    opacities.forEach((_value, i) => {
      opacities[i] = this.shownGroup.includes(i)
        ? this.shownOpacity
        : this.hiddenGroup.includes(i)
        ? this.hiddenOpacity
        : this.opacity
    })

    this.sphereMaterial!.opacity = 0.2 * this.opacity

    this.geometry!.attributes.aOpacity.needsUpdate = true
  }

  hideAll() {
    gsap.to(this, {
      opacity: 0,
      duration: 0.5,
      onStart: () => {
        this.rotate = false
      }
    })
  }

  showAll(onComplete?: () => void) {
    if (this.shownGroup.length > 0) {
      this.hiddenOpacity = 1
      this.hideGroup()
    }
    gsap.to(this, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        this.rotate = true
        onComplete?.()
      }
    })
  }

  showGroup(group: number[], onComplete: () => void) {
    if (this.shownGroup.length === 0) this.hideAll()
    else if (this.shownGroup.length > 0) this.hideGroup()
    this.shownGroup = group

    if (this.opacity === 0) {
      this.shownOpacity = 0
      gsap.to(this, {
        shownOpacity: 1,
        duration: 0.5
      })

      if (this.hiddenGroup.length > 0) {
        this.hiddenOpacity = 1
        gsap.to(this, {
          hiddenOpacity: 0,
          duration: 1,
          delay: 0.5
        })
      }
    }

    const positions = this.geometry!.getAttribute('position')
    const positionsArray = positions.array as Float32Array

    this.shownGroup.forEach((i) => {
      const card = this.cards[i]

      const cursor = {
        x: 2 * ((card.offsetLeft + card.offsetWidth / 2) / this.sizes.width) - 1,
        y: 1 - ((card.offsetTop + card.offsetWidth / 2) / this.sizes.height) * 2
      }

      const vector = new THREE.Vector3(cursor.x, cursor.y, 0.5)
      const target = new THREE.Vector3()

      const worldPosition = new THREE.Vector3()
      const localPosition = new THREE.Vector3()

      vector.unproject(this.camera.instance!)
      vector.sub(this.camera.instance!.position).normalize()
      const distance = (4.85 - this.camera.instance!.position.z) / vector.z
      target.copy(this.camera.instance!.position).add(vector.multiplyScalar(distance))

      worldPosition.fromBufferAttribute(positions, i)
      this.points!.localToWorld(worldPosition)

      gsap.to(worldPosition, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 0.5,
        onStart: () => {
          this.rotate = false
        },
        onUpdate: () => {
          localPosition.copy(worldPosition)
          this.points!.worldToLocal(localPosition)
          positionsArray[i * 3 + 0] = localPosition.x
          positionsArray[i * 3 + 1] = localPosition.y
          positionsArray[i * 3 + 2] = localPosition.z
          this.geometry!.getAttribute('position').needsUpdate = true
        },
        onComplete
      })
    })
  }

  hideGroup() {
    this.hiddenGroup = this.shownGroup
    this.shownGroup = []

    const positions = this.geometry!.getAttribute('position')
    const positionsArray = positions.array as Float32Array

    this.hiddenGroup.forEach((i) => {
      const phi = Math.PI * (1 + Math.sqrt(5)) * i
      const theta = Math.acos(1 - (2 * i) / this.count)

      const position = new THREE.Vector3().fromBufferAttribute(positions, i)

      gsap.to(position, {
        x: this.radius * Math.sin(theta) * Math.cos(phi),
        y: this.radius * Math.cos(theta),
        z: this.radius * Math.sin(theta) * Math.sin(phi),
        duration: 0.5,
        ease: 'none',
        onUpdate: () => {
          positionsArray[i * 3 + 0] = position.x
          positionsArray[i * 3 + 1] = position.y
          positionsArray[i * 3 + 2] = position.z
          this.geometry!.getAttribute('position').needsUpdate = true
        },
        onComplete: () => {
          this.hiddenGroup = []
        }
      })
    })
  }
}
