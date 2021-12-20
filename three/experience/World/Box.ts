import * as THREE from 'three'

import type GUI from 'lil-gui'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'
import type Time from '../../utils/Time'
import Experience from '..'
import Raycaster from '../Raycaster'
import Sizes from '../../utils/Sizes'
import Camera from '../Camera'
import { Vector3 } from 'three'

export default class Box {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  raycaster: Raycaster
  camera: Camera
  debug: Debug

  card: HTMLDivElement | null
  cardWrapper: HTMLDivElement | null

  model: THREE.Object3D | null = null
  material: THREE.Material | null = null

  point: THREE.Vector3 = new Vector3(4, 1.5, 3.5)
  clicked: boolean = false

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.camera = experience.camera
    this.raycaster = experience.raycaster
    this.debug = experience.debug

    this.card = document.querySelector('.product-card')
    this.cardWrapper = document.querySelector('.product-card-wrapper')

    this.setModel()
    this.setListener()
  }

  setModel() {
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffaa55,
      transparent: true,
      opacity: 1.0
    })
    this.model = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.material)
    this.model.position.set(3, 1, 3.5)

    this.scene.add(this.model)
  }

  setListener() {
    this.canvas.addEventListener('click', (event) => {
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.raycaster.instance!.setFromCamera(mouse, this.camera.instance!)

      const [intersect] = this.raycaster.instance!.intersectObject(this.model!)

      if (intersect) {
        this.clicked = true
        this.cardWrapper!.classList.add('visible')
      }
    })

    this.canvas.addEventListener('mousemove', (event) => {
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / this.sizes.width) * 2 - 1
      mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
      this.raycaster.instance!.setFromCamera(mouse, this.camera.instance!)

      const [intersect] = this.raycaster.instance!.intersectObject(this.model!)

      if (intersect) {
        this.material!.opacity = 0.5
      } else {
        this.material!.opacity = 1.0
      }
    })
  }

  update() {
    if (!this.clicked) return

    const screenPosition = this.point.clone()
    screenPosition.project(this.camera.instance!)

    const pointDistance = this.point.distanceTo(this.camera.instance!.position)

    this.raycaster.instance!.setFromCamera(screenPosition, this.camera.instance!)
    const intersects = this.raycaster.instance!.intersectObjects(this.scene.children, true)

    if (intersects.length === 0) {
      this.cardWrapper!.classList.add('visible')
    } else {
      const intersectionDistance = intersects[0].distance
      if (intersectionDistance < pointDistance) {
        this.cardWrapper!.classList.remove('visible')
      } else {
        this.cardWrapper!.classList.add('visible')
      }
    }

    // const scale = 1 / pointDistance

    const translateX = screenPosition.x * this.sizes.width * 0.5
    const translateY = -screenPosition.y * this.sizes.height * 0.5

    this.card!.style.transform = `
      translateX(${translateX}px)
      translateY(${translateY}px)
      `
    // scale(${scale}, ${scale})
  }
}
