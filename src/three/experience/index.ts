import * as THREE from 'three'

import Debug from '../utils/Debug'
import Resources from '../utils/Resources'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import PostProcessing from './PostProcessing'
import Raycaster from './Raycaster'
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

  raycaster: Raycaster

  constructor(canvas: HTMLCanvasElement, onLoad: () => void) {
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

    this.resources = new Resources(sources, this.renderer.instance!)

    this.world = new World(this)
    this.raycaster = new Raycaster(this)
    this.postProcessing = new PostProcessing(this)

    // Event bindings
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
    this.resources.on('ready', () => onLoad())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
    this.postProcessing.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.postProcessing.update()
  }

  destroy() {
    this.sizes.off('resize', () => this.resize())
    this.time.off('tick', () => this.update())

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        Object.keys(child.material).forEach((key) => {
          const value = child.material[key]
          if (value && value.dispose instanceof Function) value.dispose()
        })

        child.material.dispose()
      }
    })

    this.camera.orbitControls!.dispose()
    this.renderer.instance!.dispose()

    if (this.debug.active) {
      this.debug.ui!.destroy()
    }
  }
}