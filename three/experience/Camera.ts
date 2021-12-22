import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '.'

import gsap from 'gsap'

import type Sizes from '../utils/Sizes'
import type Debug from '../utils/Debug'
import type GUI from 'lil-gui'
import Curve from './Curve'

const TARGET_DISTANCE = 4

export default class Camera {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null
  controls: OrbitControls | null = null

  limitControls: boolean = true

  // maxAzimuthAngle: number = Infinity
  // minAzimuthAngle: number = Infinity

  defaultMaxPolarAngle: number = Math.PI
  defaultMinPolarAngle: number = 0

  maxPolarAngle: number = Math.PI / 2
  minPolarAngle: number = -Math.PI / 2

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Camera')
      // this.debugFolder
      //   .add(this, 'limitControls')
      //   .name('Limit controls')
      //   .onChange((value: boolean) => {
      //     this.controls!.enableZoom = !value
      //     if (value) {
      //       this.controls!.maxPolarAngle = this.maxPolarAngle
      //       this.controls!.minPolarAngle = this.minPolarAngle
      //       this.controls!.maxAzimuthAngle = this.maxAzimuthAngle
      //       this.controls!.minAzimuthAngle = this.minAzimuthAngle
      //     } else {
      //       this.controls!.maxPolarAngle = Math.PI
      //       this.controls!.minPolarAngle = 0
      //       this.controls!.maxAzimuthAngle = Infinity
      //       this.controls!.minAzimuthAngle = Infinity
      //     }
      //   })
    }

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(2.5, 1.5, 8)
    this.scene.add(this.instance)

    if (this.debug.active) {
      this.debugFolder!.add(this.instance, 'fov')
        .min(0.1)
        .max(100)
        .step(0.1)
        .onChange(() => {
          this.instance!.updateProjectionMatrix()
        })
    }
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance!, this.canvas)

    this.controls.enableDamping = true
    // this.controls.enablePan = false
    // this.controls.enableZoom = false

    // this.maxPolarAngle = Math.PI / 2
    // this.minPolarAngle = -Math.PI / 2
    // this.maxAzimuthAngle = Math.PI / 2
    // this.minAzimuthAngle = 0

    // if (this.limitControls) {
    this.controls.maxPolarAngle = this.maxPolarAngle
    this.controls.minPolarAngle = this.minPolarAngle

    //   this.controls.maxAzimuthAngle = this.maxAzimuthAngle
    //   this.controls.minAzimuthAngle = this.minAzimuthAngle
    // }

    this.controls.target.set(2.5, 1, 4)
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    this.controls!.update()
  }

  async toCurve(curve: Curve, forward: boolean) {
    curve.progress = forward ? 0 : 1

    const cameraPosition = curve.instance!.getPointAt(curve.progress)
    const targetDirection = curve.instance!.getTangentAt(curve.progress).normalize()
    const targetDistance = forward ? TARGET_DISTANCE : -TARGET_DISTANCE
    const targetPosition = cameraPosition.clone().addScaledVector(targetDirection, targetDistance)

    this.controls!.enabled = false
    this.controls!.maxPolarAngle = this.defaultMaxPolarAngle
    this.controls!.minPolarAngle = this.defaultMinPolarAngle

    return new Promise((resolve) => {
      gsap.to(this.controls!.target, {
        duration: 1,
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        ease: 'none',
        onComplete: () => {
          gsap.to(this.instance!.position, {
            duration: 1,
            x: cameraPosition.x,
            y: cameraPosition.y,
            z: cameraPosition.z,
            ease: 'none',
            onComplete: resolve
          })
        }
      })
    })

    // return new Promise((resolve) => {
    //   gsap.to(this.instance!.position, {
    //     duration: 0.25,
    //     x: cameraPosition.x,
    //     y: cameraPosition.y,
    //     z: cameraPosition.z,
    //     ease: 'none',
    //     onComplete: () => {
    //       gsap.to(this.controls!.target, {
    //         duration: 0.25,
    //         x: targetPosition.x,
    //         y: targetPosition.y,
    //         z: targetPosition.z,
    //         ease: 'none',
    //         onComplete: resolve
    //       })
    //     }
    //   })
    // })
  }

  async followCurve(curve: Curve, forward: boolean, duration: number) {
    curve.progress = forward ? 0 : 1

    const targetDirection = new THREE.Vector3()

    return new Promise<void>((resolve) =>
      gsap.to(curve, {
        duration,
        progress: forward ? 1 : 0,
        ease: 'power2.inOut',
        onUpdate: () => {
          curve.instance!.getPointAt(curve.progress, this.instance!.position)
          curve.instance!.getTangentAt(curve.progress, targetDirection)
          targetDirection.normalize()
          this.controls!.target.copy(this.instance!.position).addScaledVector(
            targetDirection,
            TARGET_DISTANCE
          )
        },
        onComplete: () => {
          this.controls!.enabled = true
          this.controls!.maxPolarAngle = this.maxPolarAngle
          this.controls!.minPolarAngle = this.minPolarAngle
          resolve()
        }
      })
    )
  }

  async toPoint() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
