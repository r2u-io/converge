import gsap from 'gsap'
import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '.'
import type Debug from '../utils/Debug'
import { PointerLockControls } from '../utils/PointerLockControls'
import type Sizes from '../utils/Sizes'

export default class Camera {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null

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

  setFlyControls(instructions: HTMLDivElement) {
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
  }
}
