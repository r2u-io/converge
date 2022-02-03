import gsap from 'gsap'
import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '.'
import CurvesData from '../../config/curves.json'
import type Debug from '../utils/Debug'
import { PointerLockControls } from '../utils/PointerLockControls'
import type Sizes from '../utils/Sizes'
import Time from '../utils/Time'

export default class Camera {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  debug: Debug

  time: Time

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null

  progress = 0

  activeCurve = 0

  curves: THREE.CatmullRomCurve3[]

  targets: THREE.CatmullRomCurve3[]

  flyControls: PointerLockControls | null = null

  isMobile: boolean

  flyForward = false

  flyBackward = false

  flyRight = false

  flyLeft = false

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.debug = experience.debug
    this.time = experience.time
    this.isMobile = experience.isMobile

    this.setInstance()

    this.curves = CurvesData.map(
      ({ camera }) =>
        new THREE.CatmullRomCurve3(camera.map((point) => new THREE.Vector3().fromArray(point)))
    )
    this.targets = CurvesData.map(
      ({ target }) =>
        new THREE.CatmullRomCurve3(target.map((point) => new THREE.Vector3().fromArray(point)))
    )

    this.moveCamera()
    document.addEventListener('wheel', () => this.moveCamera())
  }

  setInstance() {
    const fov = 45

    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )

    this.scene.add(this.instance)

    // TODO: Remove after loading
    this.instance.position.set(-19.82, 18.23, -12.85)
    this.instance.lookAt(0, 7.6, 0)
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
    else instructions.addEventListener('click', () => instructions.classList.add('hidden'))
  }

  setFlyControls(instructions: HTMLElement) {
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

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    if (this.flyControls) {
      const speed = 0.075

      if (this.flyForward) this.flyControls.moveForward(speed)
      if (this.flyBackward) this.flyControls.moveForward(-speed)
      if (this.flyRight) this.flyControls.moveRight(speed)
      if (this.flyLeft) this.flyControls.moveRight(-speed)
    }

    if (this.time.elapsed > 5000) this.moveCamera()
  }

  moveCamera() {
    this.progress += 0.002
    // (document.documentElement.scrollTop || document.body.scrollTop) /
    // ((document.documentElement.scrollHeight || document.body.scrollHeight) -
    //   document.documentElement.clientHeight)

    if (this.progress > 1) {
      this.progress = 0
      this.activeCurve += 1
    }

    if (this.activeCurve > 9) return

    this.instance!.position.copy(this.curves[this.activeCurve].getPointAt(this.progress))
    this.instance!.lookAt(this.targets[this.activeCurve].getPointAt(this.progress))
  }
}
