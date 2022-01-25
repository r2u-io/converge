import * as THREE from 'three'

import type Experience from '..'
import type Resources from '../../utils/Resources'
import type Sizes from '../../utils/Sizes'
import type Camera from '../Camera'
import type PostProcessing from '../PostProcessing'
import type Raycaster from '../Raycaster'
import Outline from './Outline'

export default class Model {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  raycaster: Raycaster

  resources: Resources

  camera: Camera

  postProcessing: PostProcessing

  outline: Outline

  name: string

  floor: number

  card: HTMLDivElement | null

  cardWrapper: HTMLDivElement | null

  onClick: () => void

  group: THREE.Group | null = null

  model: THREE.Object3D | null = null

  box: THREE.Mesh | null = null

  point: THREE.Vector3 = new THREE.Vector3()

  clicked = false

  drag = false

  constructor(
    experience: Experience,
    name: string,
    floor: number,
    card: HTMLDivElement | null,
    cardWrapper: HTMLDivElement | null,
    onClick: () => void = () => undefined
  ) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.camera = experience.camera
    this.raycaster = experience.raycaster
    this.resources = experience.resources
    this.postProcessing = experience.postProcessing
    this.outline = experience.world.outline!

    this.name = name
    this.floor = floor
    this.card = card
    this.cardWrapper = cardWrapper
    this.onClick = onClick

    this.setModel()
    this.setNFT()
    this.setListeners()

    experience.world.models.push(this)
  }

  setModel() {
    const model = this.scene.getObjectByName(this.name)!

    this.point.copy(model.position)
    this.model = model

    const box = new THREE.Box3()
    box.setFromObject(this.model)
    const dimensions = new THREE.Vector3().subVectors(box.max, box.min)
    const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z)
    const matrix = new THREE.Matrix4().setPosition(
      dimensions.addVectors(box.min, box.max).multiplyScalar(0.5)
    )
    boxGeo.applyMatrix4(matrix)
    this.box = new THREE.Mesh(boxGeo, this.outline.material)

    this.scene.add(this.box)
  }

  setNFT() {
    const map = this.resources.items[this.name] as THREE.Texture | undefined
    if (!map) return

    const nftIndex = Number(this.name.split('_')[1])

    const box = new THREE.Box3().setFromObject(this.model!)
    const size = new THREE.Vector3()
    box.getSize(size)
    if (size.z > size.x) size.setX(size.z)
    const { x, y } = size.addScalar(-0.1)

    const material = new THREE.MeshStandardMaterial({ map })
    const geometry = new THREE.PlaneGeometry(x, y)
    const plane = new THREE.Mesh(geometry, material)
    plane.position.copy(this.model!.position)

    map.matrixAutoUpdate = false
    const aspect = x / y
    const imageAspect = map.image.width / map.image.height
    if (aspect < imageAspect) {
      map.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5)
    } else {
      map.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5)
    }

    if (nftIndex < 15) plane.rotateY((3 * Math.PI) / 2)
    else if (nftIndex > 15 && nftIndex < 22) plane.rotateY(Math.PI / 2)
    else plane.rotateY(Math.PI)

    this.scene.add(plane)
  }

  setListeners() {
    this.raycaster.on('object-hover', (box) => {
      if (!this.model) return
      if (box === this.box) {
        this.postProcessing.selectedObjects = [this.model]
      } else {
        this.postProcessing.selectedObjects = this.postProcessing.selectedObjects.filter(
          (object) => object !== this.model
        )
      }
    })

    this.raycaster.on('object-click', (box) => {
      if (!this.model) return

      if (box === this.box) {
        this.clicked = true
        this.card?.classList.add('visible')
        this.onClick()
      } else if (this.clicked) {
        this.clicked = false
        this.card?.classList.remove('visible')
      }
    })
  }

  update() {
    if (!this.clicked || !this.cardWrapper) return

    const screenPosition = this.point.clone()
    screenPosition.project(this.camera.instance!)

    const translateX = screenPosition.x * this.sizes.width * 0.5
    const translateY = -screenPosition.y * this.sizes.height * 0.5

    this.cardWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
  }
}
