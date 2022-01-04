import * as THREE from 'three'

import type Experience from '..'
import type Sizes from '../../utils/Sizes'
import type Camera from '../Camera'
import type PostProcessing from '../PostProcessing'
import type Raycaster from '../Raycaster'

export default class Model {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  raycaster: Raycaster

  camera: Camera

  postProcessing: PostProcessing

  name: string

  card: HTMLDivElement

  cardWrapper: HTMLDivElement

  model: THREE.Object3D | undefined

  point: THREE.Vector3

  clicked = false

  drag = false

  constructor(
    experience: Experience,
    name: string,
    card: HTMLDivElement,
    cardWrapper: HTMLDivElement,
    point: THREE.Vector3
  ) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.camera = experience.camera
    this.raycaster = experience.raycaster
    this.postProcessing = experience.postProcessing

    this.name = name
    this.card = card
    this.cardWrapper = cardWrapper
    this.point = new THREE.Vector3(point.x, point.y, point.z)

    this.setModel()
    this.setListeners()
  }

  setModel() {
    const model = this.scene.getObjectByName(this.name)
    this.model = model
  }

  setListeners() {
    this.raycaster.on('object-hover', (name) => {
      if (!this.model) return
      if (name === this.name) {
        this.postProcessing.selectedObjects = [this.model]
      } else {
        this.postProcessing.selectedObjects = this.postProcessing.selectedObjects.filter(
          (object) => object !== this.model
        )
      }
    })

    this.raycaster.on('object-click', (name) => {
      if (!this.model) return

      if (name === this.name) {
        this.clicked = true
        this.card!.classList.add('visible')
      } else if (this.clicked) {
        this.clicked = false
        this.card!.classList.remove('visible')
      }
    })
  }

  update() {
    if (!this.clicked) return

    const screenPosition = this.point.clone()
    screenPosition.project(this.camera.instance!)

    const translateX = screenPosition.x * this.sizes.width * 0.5
    const translateY = -screenPosition.y * this.sizes.height * 0.5

    this.cardWrapper!.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
  }
}
