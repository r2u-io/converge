import * as THREE from 'three'

import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Avatars from './Avatars'
import Camera from './Camera'
import Renderer from './Renderer'

export default class TeamExperience {
  canvas: HTMLCanvasElement

  sizes: Sizes

  time: Time

  scene: THREE.Scene

  camera: Camera

  renderer: Renderer

  avatars: Avatars

  onResize: () => void

  constructor(canvas: HTMLCanvasElement, onResize: () => void) {
    // Options
    this.canvas = canvas
    this.onResize = onResize

    // Setup

    this.sizes = new Sizes(canvas.parentElement!)
    this.time = new Time(false)

    // THREE
    this.scene = new THREE.Scene()

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)

    this.avatars = new Avatars(this)

    // Event bindings
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
    this.avatars.resize()
    this.onResize()
  }

  update() {
    this.renderer.update()
    this.avatars.update()
  }
}
