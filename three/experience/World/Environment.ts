import * as THREE from 'three'

import type GUI from 'lil-gui'
import type Experience from '..'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'

interface EnvironmentMap {
  intensity: number
  texture: THREE.CubeTexture
  updateMaterials: () => void
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

    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, -1.25)
    this.scene.add(this.sunLight)

    if (this.debug.active) {
      this.debugFolder!.add(this.sunLight, 'intensity')
        .min(0)
        .max(10)
        .step(0.001)
        .name('SunLight Intensity')
      this.debugFolder!.add(this.sunLight.position, 'x')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('SunLight x')
      this.debugFolder!.add(this.sunLight.position, 'y')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('SunLight y')
      this.debugFolder!.add(this.sunLight.position, 'z')
        .min(-5)
        .max(5)
        .step(0.001)
        .name('SunLight z')
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentMapTexture as THREE.CubeTexture,
      updateMaterials: () => undefined
    }

    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = this.environmentMap!.texture
          child.material.envMapIntensity = this.environmentMap!.intensity
          child.material.needsUpdate = true
        }
      })
    }

    this.environmentMap.updateMaterials()

    if (this.debug.active) {
      this.debugFolder!.add(this.environmentMap, 'intensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onFinishChange(() => this.environmentMap!.updateMaterials())
    }
  }
}
