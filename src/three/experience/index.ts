import * as THREE from 'three'

import Debug from '../utils/Debug'
import Resources from '../utils/Resources'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import PostProcessing from './PostProcessing'
import Renderer from './Renderer'
import sources from './sources'
import World from './World'

export default class Experience {
  canvas: HTMLCanvasElement

  debug: Debug

  sizes: Sizes

  time: Time

  scene: THREE.Scene

  resources: Resources

  camera: Camera

  renderer: Renderer

  postProcessing: PostProcessing

  world: World

  constructor(canvas: HTMLCanvasElement) {
    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes(canvas.parentElement!)
    this.time = new Time(this.debug.active)

    // THREE
    this.scene = new THREE.Scene()

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)

    this.resources = new Resources(sources, this.renderer.instance!)

    this.world = new World(this)
    this.postProcessing = new PostProcessing(this)

    // Event bindings
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
    this.resources.on('ready', () => {
      this.scene.traverse((child) => {
        child.frustumCulled = false
      })
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
    this.postProcessing.resize()
  }

  update() {
    this.postProcessing.update()
  }
}
