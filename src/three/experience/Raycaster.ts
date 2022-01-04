import EventEmitter from 'events'

import * as THREE from 'three'

import type Experience from '.'
import type Sizes from '../utils/Sizes'
import type Camera from './Camera'

export default class Raycaster extends EventEmitter {
  canvas: HTMLCanvasElement

  scene: THREE.Scene

  camera: Camera

  sizes: Sizes

  instance: THREE.Raycaster | null = null

  drag = false

  clicked: string | null = null

  models: THREE.Object3D[] = []

  _interactions: string[] = []

  constructor(experience: Experience) {
    super()

    this.canvas = experience.canvas
    this.scene = experience.scene
    this.camera = experience.camera
    this.sizes = experience.sizes

    this.setInstance()
    this.setDownListener()
    this.setUpListener()
    this.setMoveListener()
  }

  setInstance() {
    this.instance = new THREE.Raycaster()
  }

  set interactions(values: string[]) {
    this._interactions = values
    this.models = values
      .map((value) => this.scene.getObjectByName(value) as THREE.Object3D)
      .filter((model) => model !== undefined)
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

      const [clicked] = this.instance!.intersectObjects(this.models)

      this.emit('object-click', clicked?.object?.name)
    })
  }

  setMoveListener() {
    this.canvas.addEventListener('mousemove', (event) => {
      this.drag = true

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.instance!.setFromCamera(mouse, this.camera.instance!)

      const [hover] = this.instance!.intersectObjects(this.models)

      this.emit('object-hover', hover?.object?.name)
    })
  }
}
