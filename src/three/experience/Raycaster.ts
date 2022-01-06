import EventEmitter from 'events'

import * as THREE from 'three'

import type Experience from '.'
import type Sizes from '../utils/Sizes'
import type Camera from './Camera'
import type World from './World'
import type Model from './World/Model'

export default class Raycaster extends EventEmitter {
  canvas: HTMLCanvasElement

  scene: THREE.Scene

  camera: Camera

  sizes: Sizes

  world: World

  instance: THREE.Raycaster | null = null

  drag = false

  models: Model[] = []

  constructor(experience: Experience) {
    super()
    this.setMaxListeners(110)

    this.canvas = experience.canvas
    this.scene = experience.scene
    this.camera = experience.camera
    this.sizes = experience.sizes
    this.world = experience.world

    this.setInstance()
    this.setDownListener()
    this.setUpListener()
    this.setMoveListener()
  }

  setInstance() {
    this.instance = new THREE.Raycaster()
  }

  set floor(value: number) {
    this.models = this.world.models.filter((model) => model.floor === value)
    if (value === 6) this.models = this.world.models
    this.emit('object-click', null)
    this.emit('object-hover', null)
  }

  setDownListener() {
    this.canvas.addEventListener('mousedown', () => {
      this.drag = false
    })
  }

  setUpListener() {
    this.canvas.addEventListener('mouseup', (event) => {
      if (this.drag) return

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.instance!.setFromCamera(mouse, this.camera.instance!)

      const boxes = this.models.map((model) => model.box!)
      const [intersect] = this.instance!.intersectObjects(boxes)

      this.emit('object-click', intersect?.object)
    })
  }

  setMoveListener() {
    this.canvas.addEventListener('mousemove', (event) => {
      this.drag = true

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.instance!.setFromCamera(mouse, this.camera.instance!)

      const boxes = this.models.map((model) => model.box!)
      const [intersect] = this.instance!.intersectObjects(boxes)

      this.emit('object-hover', intersect?.object)
    })
  }
}
