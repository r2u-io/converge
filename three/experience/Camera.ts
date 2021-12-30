import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'

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

const MAX_DISTANCE = Infinity
const MIN_DISTANCE = 0

const MAX_AZIMUTH_ANGLE = Infinity
const MIN_AZIMUTH_ANGLE = Infinity

const MAX_POLAR_ANGLE = Math.PI
const MIN_POLAR_ANGLE = 0

export default class Camera {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null
  orbitControls: OrbitControls | null = null

  limitControls: boolean = true

  moving = false

  vertical = false
  maxVertical = 0.0
  verticalAngle = 0.0

  distanceAngle = 0.0

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
    this.orbitControls = new OrbitControls(this.instance!, this.canvas)

    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = false
    this.orbitControls.enableDamping = true
    this.orbitControls.dampingFactor = 0.1

    if (this.debug.active) {
      this.debugFolder!.add(this.orbitControls, 'enablePan')
      this.debugFolder!.add(this.orbitControls, 'enableZoom')
      this.debugFolder!.add(this.orbitControls, 'enableDamping')
      this.debugFolder!.add(this.orbitControls, 'dampingFactor').min(0).max(1).step(0.005)
    }

    this.orbitControls.target.set(2.5, 1, 4)
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    if (this.vertical && !this.moving) {
      const verticalDistance = this.orbitControls!.getDistance() * Math.cos(this.verticalAngle)

      const y = this.instance!.position.y - verticalDistance

      if (y > 0 && y <= this.maxVertical) {
        this.orbitControls!.target.y = y
      }

      this.instance!.position.y = this.orbitControls!.target.y + verticalDistance
    }

    this.orbitControls!.update()
  }

  async toCurve(curve: Curve, forward: boolean) {
    this.moving = true
    this.distanceAngle = 0

    const start = this.instance!.position.clone()
    const target = curve.instance!.getPointAt(forward ? 0 : 1)

    const angleEnd = start.angleTo(target)
    const normal = start.clone().cross(target).normalize()

    this.orbitControls!.enabled = false
    this.orbitControls!.maxAzimuthAngle = MAX_AZIMUTH_ANGLE
    this.orbitControls!.minAzimuthAngle = MIN_AZIMUTH_ANGLE
    this.orbitControls!.maxPolarAngle = MAX_POLAR_ANGLE
    this.orbitControls!.minPolarAngle = MIN_POLAR_ANGLE
    this.orbitControls!.maxDistance = MAX_DISTANCE
    this.orbitControls!.minDistance = MIN_DISTANCE

    const diameter = 2 * this.orbitControls!.getDistance()
    const distance = start.distanceTo(target)
    const duration = (0.5 * distance) / diameter

    return new Promise<void>((resolve) =>
      gsap.to(this, {
        distanceAngle: angleEnd,
        duration,
        ease: 'none',
        onUpdate: () => {
          this.instance!.position.copy(start).applyAxisAngle(normal, this.distanceAngle)
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
    this.orbitControls!.enabled = false

    curve.progress = forward ? 0 : 1

    gsap.to(this.orbitControls!.target, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration
    })

    return new Promise<void>((resolve) =>
      gsap.to(curve, {
        duration,
        progress: forward ? 1 : 0,
        ease: 'none',
        onUpdate: () => {
          curve.instance!.getPointAt(curve.progress, this.instance!.position)
        },
        onComplete: () => {
          this.moving = false
          this.orbitControls!.enabled = true
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
    this.orbitControls!.minDistance = MIN_DISTANCE
    this.orbitControls!.maxDistance = MAX_DISTANCE
    this.orbitControls!.minPolarAngle = MIN_POLAR_ANGLE
    this.orbitControls!.maxPolarAngle = MAX_POLAR_ANGLE
    this.orbitControls!.minAzimuthAngle = MIN_AZIMUTH_ANGLE
    this.orbitControls!.maxAzimuthAngle = MAX_AZIMUTH_ANGLE

    const camera = new THREE.Vector3().fromArray(cameraPosition)
    const target = new THREE.Vector3().fromArray(targetPosition)

    this.instance!.position.copy(camera)
    this.orbitControls!.target.copy(target)
    this.orbitControls!.update()

    this.vertical = vertical
    this.maxVertical = target.y
    this.verticalAngle = this.orbitControls!.getPolarAngle()
    this.orbitControls!.rotateSpeed = this.vertical ? 0.1 : 1.0
    this.orbitControls!.minDistance = this.vertical
      ? this.orbitControls!.getDistance()
      : MIN_DISTANCE
    this.orbitControls!.maxDistance = this.vertical
      ? this.orbitControls!.getDistance()
      : MAX_DISTANCE

    this.orbitControls!.maxPolarAngle = (Math.PI * maxPolarAngle) / 180
    this.orbitControls!.minPolarAngle = (Math.PI * minPolarAngle) / 180
    this.orbitControls!.maxAzimuthAngle = (Math.PI * maxAzimuthAngle) / 180
    this.orbitControls!.minAzimuthAngle = (Math.PI * minAzimuthAngle) / 180

    this.orbitControls!.update()
  }
}
