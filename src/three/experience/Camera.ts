import gsap from 'gsap'
import type GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import type Experience from '.'
import type Debug from '../utils/Debug'
import { PointerLockControls } from '../utils/PointerLockControls'
import type Sizes from '../utils/Sizes'
import type Curve from './Curve'

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

  flyControls: PointerLockControls | null = null

  isMobile: boolean

  moving = false

  vertical = false

  maxVertical = 0.0

  verticalAngle = 0.0

  distanceAngle = 0.0

  flyForward = false

  flyBackward = false

  flyRight = false

  flyLeft = false

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.debug = experience.debug
    this.isMobile = experience.isMobile

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

    this.scene.add(this.instance)

    // TODO: Remove after loading
    this.instance.position.set(-19.82, 18.23, -12.85)
  }

  setOrbitControls() {
    if (this.flyControls) {
      this.flyControls.dispose()
      this.flyControls = null
    }

    this.orbitControls = new OrbitControls(this.instance!, this.canvas)

    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = true
    this.orbitControls.enableDamping = true
    this.orbitControls.dampingFactor = 0.1

    if (this.debug.active) {
      this.debugFolder!.add(this.orbitControls, 'enablePan')
      this.debugFolder!.add(this.orbitControls, 'enableZoom')
      this.debugFolder!.add(this.orbitControls, 'enableDamping')
      this.debugFolder!.add(this.orbitControls, 'dampingFactor').min(0).max(1).step(0.005)
    }

    // TODO: Remove after loading
    this.orbitControls.target.set(0, 7.6, 0)
  }

  openFOV(duration: number) {
    gsap.to(this.instance!, {
      fov: 45,
      duration,
      ease: 'none',
      onUpdate: () => this.instance!.updateProjectionMatrix()
    })
  }

  setFreeTour(instructions: HTMLDivElement) {
    if (!this.isMobile) this.setFlyControls(instructions)
    else this.setMobileControls(instructions)
  }

  setFlyControls(instructions: HTMLDivElement) {
    if (this.orbitControls) {
      this.orbitControls.dispose()
      this.orbitControls = null
    }

    this.flyControls = new PointerLockControls(this.instance!, this.canvas)
    this.flyControls.sensitivity = 0.5

    instructions.addEventListener('click', () => this.flyControls?.lock())

    this.flyControls.addEventListener('lock', () => instructions.classList.add('hidden'))
    this.flyControls.addEventListener('unlock', () => instructions.classList.remove('hidden'))

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w':
          this.flyForward = true
          break
        case 's':
          this.flyBackward = true
          break
        case 'd':
          this.flyRight = true
          break
        case 'a':
          this.flyLeft = true
          break
        default:
          break
      }
    })
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'w':
          this.flyForward = false
          break
        case 's':
          this.flyBackward = false
          break
        case 'd':
          this.flyRight = false
          break
        case 'a':
          this.flyLeft = false
          break
        default:
          break
      }
    })

    if (this.debug.active) {
      this.debugFolder!.add(this.flyControls, 'sensitivity').min(0).max(2).step(0.001)
    }

    this.scene.add(this.flyControls.getObject())
  }

  setMobileControls(instructions: HTMLDivElement) {
    this.resetControls()
    this.orbitControls!.enablePan = true
    instructions.addEventListener('click', () => instructions.classList.add('hidden'))
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    if (this.vertical && !this.moving && this.orbitControls) {
      const verticalDistance = this.orbitControls.getDistance() * Math.cos(this.verticalAngle)

      const y = this.instance!.position.y - verticalDistance

      if (y > 0 && y <= this.maxVertical) {
        this.orbitControls.target.y = y
      }

      this.instance!.position.y = this.orbitControls.target.y + verticalDistance
    }

    this.orbitControls?.update()
    if (this.flyControls) {
      const speed = 0.075

      if (this.flyForward) this.flyControls.moveForward(speed)
      if (this.flyBackward) this.flyControls.moveForward(-speed)
      if (this.flyRight) this.flyControls.moveRight(speed)
      if (this.flyLeft) this.flyControls.moveRight(-speed)
    }
  }

  resetControls() {
    if (!this.orbitControls) return

    this.orbitControls.maxAzimuthAngle = MAX_AZIMUTH_ANGLE
    this.orbitControls.minAzimuthAngle = MIN_AZIMUTH_ANGLE
    this.orbitControls.maxPolarAngle = MAX_POLAR_ANGLE
    this.orbitControls.minPolarAngle = MIN_POLAR_ANGLE
    this.orbitControls.maxDistance = MAX_DISTANCE
    this.orbitControls.minDistance = MIN_DISTANCE
  }

  setMoving() {
    if (!this.orbitControls) return

    this.moving = true
    this.orbitControls.enabled = false
    this.resetControls()
  }

  async toCurve(curve: Curve, forward: boolean): Promise<void> {
    if (!this.orbitControls) return new Promise<void>(() => undefined)

    this.setMoving()

    this.distanceAngle = 0

    const start = this.instance!.position.clone()
    const target = curve.instance!.getPointAt(forward ? 0 : 1)

    const angleEnd = start.angleTo(target)
    const normal = start.clone().cross(target).normalize()

    const diameter = 2 * this.orbitControls.getDistance()
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
    if (!this.orbitControls) return new Promise<void>(() => undefined)

    this.setMoving()

    const position = this.instance!.position.clone()

    curve.progress = forward ? 0 : 1

    if (forward) curve.setFirstPoint(position)
    else curve.setLastPoint(position)

    gsap.to(this.orbitControls.target, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration,
      ease: 'none'
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
    if (!this.orbitControls) return

    this.resetControls()

    const camera = new THREE.Vector3().fromArray(cameraPosition)
    const target = new THREE.Vector3().fromArray(targetPosition)

    this.instance!.position.copy(camera)
    this.orbitControls.target.copy(target)
    this.orbitControls.update()

    this.vertical = vertical
    this.maxVertical = target.y
    this.verticalAngle = this.orbitControls.getPolarAngle()
    this.orbitControls.rotateSpeed = this.vertical ? 0.1 : 1.0
    this.orbitControls.minDistance = this.vertical ? this.orbitControls.getDistance() : MIN_DISTANCE
    this.orbitControls.maxDistance = this.vertical ? this.orbitControls.getDistance() : MAX_DISTANCE

    this.orbitControls.maxPolarAngle = (Math.PI * maxPolarAngle) / 180
    this.orbitControls.minPolarAngle = (Math.PI * minPolarAngle) / 180
    this.orbitControls.maxAzimuthAngle = (Math.PI * maxAzimuthAngle) / 180
    this.orbitControls.minAzimuthAngle = (Math.PI * minAzimuthAngle) / 180

    this.orbitControls.update()
  }
}
