import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '.'

import gsap from 'gsap'

import type Sizes from '../utils/Sizes'

export default class Camera {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene

  instance: THREE.PerspectiveCamera | null = null
  controls: OrbitControls | null = null

  ready: boolean = false

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene

    this.setInstance()
    this.setOrbitControls()
    this.ready = true
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(90, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(2.5, 1.5, 6)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance!, this.canvas)

    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.enableZoom = false

    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = -Math.PI / 2
    this.controls.maxAzimuthAngle = Math.PI / 2
    this.controls.minAzimuthAngle = 0

    this.controls.target.set(2.5, 1, 4)
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    this.controls!.update()
  }

  move() {
    if (!this.ready) return

    this.controls!.enabled = false

    gsap.to(this.instance!.position, {
      duration: 2,
      x: -3.5,
      y: 1.5,
      z: 0,
      ease: 'power4.easeInOut'
    })

    gsap
      .to(this.controls!.target, {
        duration: 2,
        x: -3.5,
        y: 1.5,
        z: -1,
        ease: 'power4.easeInOut'
      })
      .then(() => {
        this.controls!.enabled = true
        this.controls!.maxAzimuthAngle = -Math.PI
        this.controls!.minAzimuthAngle = 0
      })
  }
}
