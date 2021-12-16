import * as THREE from 'three'
import Camera from './Camera'

import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Debug from '../utils/Debug'

import Renderer from './Renderer'
import World from './World'
import Resources from '../utils/Resources'

import sources from './sources'
import Raycaster from './Raycaster'

export default class Experience {
  canvas: HTMLCanvasElement
  debug: Debug
  sizes: Sizes
  time: Time

  scene: THREE.Scene
  resources: Resources
  camera: Camera
  renderer: Renderer
  world: World
  raycaster: Raycaster

  constructor(canvas: HTMLCanvasElement) {
    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()

    // THREE
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.world = new World(this)
    this.raycaster = new Raycaster(this)

    // Event bindings
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize', () => this.resize())
    this.time.off('tick', () => this.update())

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        for (const key in child.material) {
          const value = child.material[key]
          if (value && value.dispose instanceof Function) value.dispose()
        }
        child.material.dispose()
      }
    })

    this.camera.controls?.dispose()
    this.renderer.instance?.dispose()

    if (this.debug.active) {
      this.debug.ui!.destroy()
    }
  }
}
