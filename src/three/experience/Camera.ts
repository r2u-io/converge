import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '.'
import CurvesData from '../../config/curves.json'
import type Debug from '../utils/Debug'
import type Sizes from '../utils/Sizes'

export default class Camera {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.PerspectiveCamera | null = null

  activeCurve = 0

  curves: THREE.CatmullRomCurve3[]

  targets: THREE.CatmullRomCurve3[]

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.debug = experience.debug

    this.setInstance()

    this.curves = CurvesData.map(
      ({ camera }) =>
        new THREE.CatmullRomCurve3(camera.map((point) => new THREE.Vector3().fromArray(point)))
    )
    this.targets = CurvesData.map(
      ({ target }) =>
        new THREE.CatmullRomCurve3(target.map((point) => new THREE.Vector3().fromArray(point)))
    )

    this.move()
    document.addEventListener('scroll', () => this.move())
    document.body.addEventListener('scroll', () => this.move())
  }

  setInstance() {
    const fov = window.matchMedia('(orientation: portrait)').matches ? 75 : 50

    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )

    this.scene.add(this.instance)
  }

  resize() {
    this.instance!.aspect = this.sizes.width / this.sizes.height
    this.instance!.updateProjectionMatrix()
  }

  move() {
    const scrollY = window.scrollY / this.sizes.height
    const scrollX = document.body.scrollLeft / this.sizes.width

    const scroll = Math.max(scrollY, scrollX)

    const section = Math.floor(scroll)

    const progress = scroll - section

    if (this.activeCurve !== section) {
      this.activeCurve = section
    }

    if (this.activeCurve > 5) return

    this.instance!.position.copy(this.curves[this.activeCurve].getPointAt(progress))
    this.instance!.lookAt(this.targets[this.activeCurve].getPointAt(progress))
  }
}
