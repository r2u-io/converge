import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '.'

import gsap from 'gsap'

import type Sizes from '../utils/Sizes'
import type Debug from '../utils/Debug'
import type GUI from 'lil-gui'

export default class Camera {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null
  controls: OrbitControls | null = null

  ready: boolean = false
  limitControls: boolean = true

  maxAzimuthAngle: number = Infinity
  minAzimuthAngle: number = Infinity
  maxPolarAngle: number = Math.PI
  minPolarAngle: number = 0

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Camera')
      this.debugFolder
        .add(this, 'limitControls')
        .name('Limit controls')
        .onChange((value: boolean) => {
          this.controls!.enableZoom = !value
          if (value) {
            this.controls!.maxPolarAngle = this.maxPolarAngle
            this.controls!.minPolarAngle = this.minPolarAngle
            this.controls!.maxAzimuthAngle = this.maxAzimuthAngle
            this.controls!.minAzimuthAngle = this.minAzimuthAngle
          } else {
            this.controls!.maxPolarAngle = Math.PI
            this.controls!.minPolarAngle = 0
            this.controls!.maxAzimuthAngle = Infinity
            this.controls!.minAzimuthAngle = Infinity
          }
        })
    }

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

    this.maxPolarAngle = Math.PI / 2
    this.minPolarAngle = -Math.PI / 2
    this.maxAzimuthAngle = Math.PI / 2
    this.minAzimuthAngle = 0

    if (this.limitControls) {
      this.controls.maxPolarAngle = this.maxPolarAngle
      this.controls.minPolarAngle = this.minPolarAngle
      this.controls.maxAzimuthAngle = this.maxAzimuthAngle
      this.controls.minAzimuthAngle = this.minAzimuthAngle
    }

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

        this.maxAzimuthAngle = -Math.PI
        this.minAzimuthAngle = 0

        if (this.limitControls) {
          this.controls!.maxAzimuthAngle = this.maxAzimuthAngle
          this.controls!.minAzimuthAngle = this.minAzimuthAngle
        }
      })
  }
}
