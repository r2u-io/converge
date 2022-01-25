import * as THREE from 'three'

import type TeamExperience from '.'
import type Sizes from '../utils/Sizes'

export default class Camera {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  instance: THREE.PerspectiveCamera | null = null

  constructor(teamExperience: TeamExperience) {
    this.canvas = teamExperience.canvas
    this.sizes = teamExperience.sizes
    this.scene = teamExperience.scene

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(85, this.sizes.width / this.sizes.height, 0.1, 1000)
    this.scene.add(this.instance)
    this.instance.position.set(0, 0, 10)
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }
}
