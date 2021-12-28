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

  moving = false

  vertical = false
  verticalX = 0.0
  verticalZ = 0.0

  phi = 0.0
  theta = 0.0
  radius = 0.0
  angle = 0.0

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

    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )
    this.instance.position.set(2.5, 1.5, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance!, this.canvas)

    // this.controls.enablePan = false
    // this.controls.enableZoom = false
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
    if (this.vertical && !this.moving) {
      this.instance!.position.x = this.verticalX
      this.instance!.position.z = this.verticalZ
    }

    this.controls!.update()
  }

  async toCurve(curve: Curve) {
    this.moving = true
    this.angle = 0

    const start = this.instance!.position.clone()
    const target = curve.instance!.getPointAt(0)

    const angleEnd = start.angleTo(target)
    const normal = start.clone().cross(target).normalize()

    this.controls!.enabled = false
    this.controls!.maxAzimuthAngle = this.defaultMaxAzimuthAngle
    this.controls!.minAzimuthAngle = this.defaultMinAzimuthAngle
    this.controls!.maxPolarAngle = this.defaultMaxPolarAngle
    this.controls!.minPolarAngle = this.defaultMinPolarAngle

    return new Promise<void>((resolve) =>
      gsap.to(this, {
        angle: angleEnd,
        duration: 0.5,
        ease: 'none',
        onUpdate: () => {
          this.instance!.position.copy(start).applyAxisAngle(normal, this.angle)
        },
        onComplete: () => {
          this.moving = false
          resolve()
        }
      })
    )
  }

  async followCurve(
    curve: Curve,
    forward: boolean,
    duration: number,
    targetPosition: THREE.Vector3
  ) {
    this.moving = true
    this.controls!.enabled = false

    curve.progress = forward ? 0 : 1

    gsap.to(this.controls!.target, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration
    })

    return new Promise<void>((resolve) =>
      gsap.to(curve, {
        duration,
        progress: forward ? 1 : 0,
        ease: 'power4.out',
        onUpdate: () => {
          curve.instance!.getPointAt(curve.progress, this.instance!.position)
        },
        onComplete: () => {
          this.moving = false
          this.controls!.enabled = true
          resolve()
        }
      })
    )
  }

  toPoint({
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
}
