import type GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import type Team from '.'
import type Debug from '../utils/Debug'
import type Sizes from '../utils/Sizes'

export default class Camera {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null

  controls: OrbitControls | null = null

  constructor(team: Team) {
    this.canvas = team.canvas
    this.sizes = team.sizes
    this.scene = team.scene
    this.debug = team.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Camera')
    }

    this.setInstance()
    this.setControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(90, this.sizes.width / this.sizes.height, 0.1, 1000)
    this.scene.add(this.instance)
    this.instance.position.set(0, 0, 10)
  }

  setControls() {
    this.controls = new OrbitControls(this.instance!, this.canvas)

    this.controls.enablePan = false
    this.controls.enableZoom = true
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1

    if (this.debug.active) {
      this.debugFolder!.add(this.controls, 'enablePan')
      this.debugFolder!.add(this.controls, 'enableZoom')
      this.debugFolder!.add(this.controls, 'enableDamping')
      this.debugFolder!.add(this.controls, 'dampingFactor').min(0).max(1).step(0.005)
    }
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    this.controls!.update()
  }
}
