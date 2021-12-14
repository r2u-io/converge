import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '.'

import type Sizes from '../utils/Sizes'

export default class Camera {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene

  instance: THREE.PerspectiveCamera | null = null
  controls: OrbitControls | null = null

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(90, this.sizes.width / this.sizes.height, 0.1, 100)

    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance!, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  update() {
    this.controls!.update()
  }
}
