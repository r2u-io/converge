import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Sizes {
  width: number
  height: number
}

export class MetaScene extends THREE.Scene {
  canvas: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  sizes: Sizes

  camera: THREE.PerspectiveCamera

  controls: OrbitControls

  constructor(canvas: HTMLCanvasElement) {
    super()

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    })

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(new THREE.Color(0xc0c0c0))

    const camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
    camera.position.z = 3

    this.camera = camera
    this.add(camera)

    this.controls = new OrbitControls(this.camera, this.canvas)
    this.setupControls()

    window.addEventListener('resize', () => {
      this.sizes.height = window.innerHeight
      this.sizes.width = window.innerWidth

      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    this.setupObjects()
    this.setupLights()

    this.animationLoop = this.animationLoop.bind(this)
  }

  setupControls() {
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = -Math.PI / 2

    this.controls.maxAzimuthAngle = Math.PI / 4
    this.controls.minAzimuthAngle = -Math.PI / 4
  }

  setupObjects() {
    const geometry = new THREE.BoxGeometry(2, 2, 0.1)
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })

    const area = new THREE.Group()

    const wall1 = new THREE.Mesh(geometry, material)
    const wall2 = new THREE.Mesh(geometry, material)
    const wall3 = new THREE.Mesh(geometry, material)

    wall1.position.set(0, -1, 0)
    wall2.position.set(1, 0, 0)
    wall3.position.set(0, 0, -1)

    wall1.rotateX(Math.PI / 2)
    wall2.rotateY(Math.PI / 2)
    wall3.rotateZ(Math.PI / 2)

    area.add(wall1)
    area.add(wall2)
    area.add(wall3)

    this.add(area)

    area.rotateY(Math.PI / 4)
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(2, 4, 3)
    this.add(directionalLight)
  }

  animationLoop(time: number) {
    this.controls.update()

    this.renderer.render(this, this.camera)
  }

  render() {
    this.renderer.setAnimationLoop((time: number) => this.animationLoop(time))
  }
}
