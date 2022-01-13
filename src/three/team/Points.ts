import gsap from 'gsap'
import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Team from '.'
import type Debug from '../utils/Debug'
import Time from '../utils/Time'
import Renderer from './Renderer'

export default class Points {
  canvas: HTMLCanvasElement

  scene: THREE.Scene

  renderer: Renderer

  time: Time

  debug: Debug

  debugFolder: GUI | null = null

  count: number

  texture: THREE.Texture

  points: THREE.Points | null = null

  geometry: THREE.BufferGeometry | null = null

  material: THREE.ShaderMaterial | null = null

  rotate = true

  axisPrimary: THREE.Vector3

  axisSecondary: THREE.Vector3

  active: number[] = []

  opacity = 1

  constructor(team: Team) {
    this.canvas = team.canvas
    this.scene = team.scene
    this.renderer = team.renderer
    this.debug = team.debug
    this.time = team.time

    this.count = 24

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

    gsap.delayedCall(4.0, () => this.activateTeam())
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

    const radius = 6

    const tilesX = 8
    const tilesY = 4

    index.forEach((i) => {
      const phi = Math.PI * (1 + Math.sqrt(5)) * i
      const theta = Math.acos(1 - (2 * i) / this.count)

      positions[i * 3 + 0] = radius * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = radius * Math.cos(theta)
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi)

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
        uSize: { value: 800.0 * this.renderer.instance!.getPixelRatio() },
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
          gl_FragColor.a *= vOpacity;
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

    this.canvas.addEventListener('mousedown', () => {
      this.rotate = false
    })
    this.canvas.addEventListener('mouseup', () => {
      this.rotate = true
    })
  }

  update() {
    if (this.rotate) {
      this.points!.rotateOnAxis(this.axisPrimary, 0.005)
      this.axisPrimary.applyAxisAngle(this.axisSecondary, Math.sin(this.time.elapsed / 1000) * 0.01)
    }

    const opacities = this.geometry!.getAttribute('aOpacity').array as Float32Array
    opacities.forEach((_value, i) => {
      if (!this.active.includes(i)) opacities[i] = this.opacity
    })
    this.geometry!.attributes.aOpacity.needsUpdate = true
  }

  activateTeam() {
    this.rotate = false
    this.active = [0, 1, 2]

    gsap.to(this, {
      opacity: 0,
      duration: 1.0
    })

    const positions = this.geometry!.getAttribute('position')
    const positionsArray = positions.array as Float32Array

    this.active.forEach((i, j) => {
      const worldPosition = new THREE.Vector3()
      const localPosition = new THREE.Vector3()

      worldPosition.fromBufferAttribute(positions, i)
      this.points!.localToWorld(worldPosition)

      const t = j / (this.active.length - 1)

      gsap.to(worldPosition, {
        x: -4,
        y: 4 * (2 * t - 1),
        z: 5,
        duration: 1.0,
        ease: 'none',
        onUpdate: () => {
          localPosition.copy(worldPosition)
          this.points!.worldToLocal(localPosition)
          positionsArray[i * 3 + 0] = localPosition.x
          positionsArray[i * 3 + 1] = localPosition.y
          positionsArray[i * 3 + 2] = localPosition.z
          this.geometry!.getAttribute('position').needsUpdate = true
        }
      })
    })
  }
}
