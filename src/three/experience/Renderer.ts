import GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '.'
import type Debug from '../utils/Debug'
import type Sizes from '../utils/Sizes'
import type Camera from './Camera'

export default class Renderer {
  canvas: HTMLCanvasElement

  sizes: Sizes

  scene: THREE.Scene

  camera: Camera

  debug: Debug

  debugFolder: GUI | null = null

  instance: THREE.WebGLRenderer | null = null

  constructor(experience: Experience) {
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.camera = experience.camera
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Renderer')
    }

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })

    this.instance.physicallyCorrectLights = true
    this.instance.outputEncoding = THREE.sRGBEncoding

    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 2.45

    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap

    this.instance.setClearColor('#211d20', 0)
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

    if (this.debug.active) {
      this.debugFolder!.add(this.instance, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
      }).onChange(() => {
        this.instance!.toneMapping = Number(this.instance!.toneMapping)
        this.updateAllMaterials()
      })

      this.debugFolder!.add(this.instance, 'toneMappingExposure').min(0).max(10).step(0.001)
    }
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height)
    this.instance!.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.instance!.render(this.scene, this.camera.instance!)
  }

  updateAllMaterials() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        if (child.name !== 'screen') child.renderOrder = 1000
        child.material.needsUpdate = true
      }
    })
  }
}
