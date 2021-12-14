import * as THREE from 'three'
import Experience from '.'

import type Sizes from '../utils/Sizes'
import type Camera from './Camera'

export default class Renderer {
  canvas: HTMLCanvasElement
  sizes: Sizes
  scene: THREE.Scene
  camera: Camera

  instance: THREE.WebGLRenderer | null = null

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.camera = experience.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })

    this.instance.physicallyCorrectLights = true
    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setClearColor('#211d20')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height)
    this.instance!.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.instance!.render(this.scene, this.camera.instance!)
  }
}
