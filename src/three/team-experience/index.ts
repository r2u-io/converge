import * as THREE from 'three'

import Debug from '../utils/Debug'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import Points from './Points'
import Renderer from './Renderer'

export default class TeamExperience {
  canvas: HTMLCanvasElement

  debug: Debug

  sizes: Sizes

  time: Time

  scene: THREE.Scene

  camera: Camera

  renderer: Renderer

  points: Points

  constructor(canvas: HTMLCanvasElement) {
    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time(this.debug.active)

    // THREE
    this.scene = new THREE.Scene()

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)

    this.points = new Points(this)

    // Event bindings
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.renderer.update()
    this.points.update()
  }
}
