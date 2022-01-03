import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '..'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'

interface EnvironmentMap {
  intensity: number
  texture: THREE.CubeTexture
}

export default class Environment {
  scene: THREE.Scene

  resources: Resources

  debug: Debug

  debugFolder: GUI | null = null

  sunLight: THREE.DirectionalLight | null = null

  environmentMap: EnvironmentMap | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Environment')
    }

    this.setEnvironmentMap()
  }

  setEnvironmentMap() {
    this.environmentMap = {
      intensity: 3.5,
      texture: this.resources.items.environmentMapTexture as THREE.CubeTexture
    }

    this.environmentMap.texture.encoding = THREE.sRGBEncoding
    this.scene.environment = this.environmentMap.texture

    this.updateMaterials()

    if (this.debug.active) {
      this.debugFolder!.add(this.environmentMap, 'intensity')
        .min(0)
        .max(10)
        .step(0.001)
        .onFinishChange(() => this.updateMaterials())
    }
  }

  updateMaterials() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMap = this.environmentMap!.texture
        child.material.envMapIntensity = this.environmentMap!.intensity
        child.material.needsUpdate = true
      }
    })
  }
}
