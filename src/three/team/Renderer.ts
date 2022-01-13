import * as THREE from 'three'

import type Team from '.'
import type Sizes from '../utils/Sizes'
import type Camera from './Camera'

export default class Renderer {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  camera: Camera

  instance: THREE.WebGLRenderer | null = null

  constructor(team: Team) {
    this.canvas = team.canvas
    this.sizes = team.sizes
    this.scene = team.scene
    this.camera = team.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })

    this.instance.setClearColor('#000000', 1)
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height)
    this.instance!.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.instance!.render(this.scene, this.camera.instance!)
  }
}
