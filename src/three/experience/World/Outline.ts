import type GUI from 'lil-gui'
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type Experience from '..'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'

export default class Outline {
  scene: THREE.Scene

  resources: Resources

  debug: Debug

  resource: GLTF

  debugFolder: GUI | null = null

  material: THREE.MeshBasicMaterial

  model: THREE.Object3D | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Outline')
    }

    this.resource = this.resources.items.outlineModel as GLTF
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      transparent: true,
      opacity: 0
    })

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.material
      }
    })

    this.scene.add(this.model)
  }
}
