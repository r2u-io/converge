import * as THREE from 'three'

import type Experience from '.'
import type Camera from './Camera'

export default class Raycaster {
  canvas: HTMLCanvasElement

  camera: Camera

  instance: THREE.Raycaster | null = null

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.camera = experience.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.Raycaster()
  }
}
