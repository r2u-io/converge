import * as THREE from 'three'

import type Experience from '..'
import type Raycaster from '../Raycaster'
import type Sizes from '../../utils/Sizes'
import type Camera from '../Camera'
import type PostProcessing from '../PostProcessing'

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

  clicked: boolean = false
  drag: boolean = false

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
    this.setListener()
  }

  setModel() {
    const model = this.scene.getObjectByName(this.name)
    this.model = model
  }

  setListener() {
    if (!this.model) return

    this.canvas.addEventListener('mousedown', () => (this.drag = false))

    this.canvas.addEventListener('mouseup', (event) => {
      if (!this.model) return
      if (this.drag) return

      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.raycaster.instance!.setFromCamera(mouse, this.camera.instance!)

      const [intersect] = this.raycaster.instance!.intersectObject(this.model)

      if (intersect) {
        this.clicked = true
        this.card!.classList.add('visible')
      } else if (this.clicked) {
        this.clicked = false
        this.card!.classList.remove('visible')
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

  update() {
    if (!this.clicked) return

    const screenPosition = this.point.clone()
    screenPosition.project(this.camera.instance!)

    const translateX = screenPosition.x * this.sizes.width * 0.5
    const translateY = -screenPosition.y * this.sizes.height * 0.5

    this.cardWrapper!.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
  }
}
