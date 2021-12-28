import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '.'

import gsap from 'gsap'

import type Sizes from '../utils/Sizes'
import type Debug from '../utils/Debug'
import type GUI from 'lil-gui'
import Curve from './Curve'

interface PointData {
  vertical: boolean
  targetPosition: number[]
  cameraPosition: number[]
  maxPolarAngle: number
  minPolarAngle: number
  maxAzimuthAngle: number
  minAzimuthAngle: number
}

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

  defaultMaxAzimuthAngle: number = Infinity
  defaultMinAzimuthAngle: number = Infinity

  defaultMaxPolarAngle: number = Math.PI
  defaultMinPolarAngle: number = 0

  maxPolarAngle: number = Math.PI / 2
  minPolarAngle: number = -Math.PI / 2

  vertical = false
  verticalX = 0.0
  verticalZ = 0.0

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Camera')
    }

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    const fov = 15

    this.instance = new THREE.PerspectiveCamera(fov, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(2.5, 1.5, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance!, this.canvas)

    this.controls.enablePan = false
    this.controls.enableZoom = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.025

    if (this.debug.active) {
      this.debugFolder!.add(this.controls.target, 'x').min(-10).max(10).step(0.01).name('Target X')
      this.debugFolder!.add(this.controls.target, 'y').min(-10).max(10).step(0.01).name('Target Y')
      this.debugFolder!.add(this.controls.target, 'z').min(-10).max(10).step(0.01).name('Target Z')
    }

    this.controls.target.set(2.5, 1, 4)
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    if (this.vertical) {
      this.instance!.position.x = this.verticalX
      this.instance!.position.z = this.verticalZ
    }

    this.controls!.update()
  }

  setPoint({
    vertical,
    targetPosition,
    cameraPosition,
    maxPolarAngle,
    minPolarAngle,
    maxAzimuthAngle,
    minAzimuthAngle
  }: PointData) {
    const camera = new THREE.Vector3().fromArray(cameraPosition)
    const target = new THREE.Vector3().fromArray(targetPosition)

    this.vertical = vertical
    this.verticalX = camera.x
    this.verticalZ = camera.z

    this.instance!.position.copy(camera)
    this.controls!.target.copy(target)

    this.controls!.maxPolarAngle = (Math.PI * maxPolarAngle) / 180
    this.controls!.minPolarAngle = (Math.PI * minPolarAngle) / 180
    this.controls!.maxAzimuthAngle = (Math.PI * maxAzimuthAngle) / 180
    this.controls!.minAzimuthAngle = (Math.PI * minAzimuthAngle) / 180
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
          resolve()
        }
      })
    )
  }

  async toPoint() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
