import * as THREE from 'three'

import type Experience from '..'
import type Sizes from '../../utils/Sizes'
import type Camera from '../Camera'
import type PostProcessing from '../PostProcessing'
import type Raycaster from '../Raycaster'

export default class OverlayModel {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  raycaster: Raycaster

  camera: Camera

  postProcessing: PostProcessing

  name: string

  model: THREE.Object3D | undefined

  onOpen: () => void

  clicked = false

  drag = false

  constructor(experience: Experience, name: string, onOpen: () => void) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.camera = experience.camera
    this.raycaster = experience.raycaster
    this.postProcessing = experience.postProcessing

    this.name = name

    this.onOpen = onOpen
    this.setModel()
    this.setListener()
  }

  setModel() {
    const model = this.scene.getObjectByName(this.name)
    this.model = model
  }

  setListener() {
    if (!this.model) return

    this.canvas.addEventListener('mousedown', () => {
      this.drag = false
    })

    this.canvas.addEventListener('mouseup', (event) => {
      if (!this.model) return
      if (this.drag) return

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.raycaster.instance!.setFromCamera(mouse, this.camera.instance!)

      const [intersect] = this.raycaster.instance!.intersectObject(this.model)

      if (intersect) {
        this.onOpen()
      }
    })

    this.canvas.addEventListener('mousemove', (event) => {
      this.drag = true

      if (!this.model) return

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.raycaster.instance!.setFromCamera(mouse, this.camera.instance!)

      const [intersect] = this.raycaster.instance!.intersectObject(this.model)

      if (intersect) {
        this.postProcessing.selectedObjects = [this.model]
      } else {
        this.postProcessing.selectedObjects = this.postProcessing.selectedObjects.filter(
          (object) => object !== this.model
        )
      }
    })
  }
}
