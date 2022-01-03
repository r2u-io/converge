import type GUI from 'lil-gui'
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type Experience from '..'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'

export default class House {
  scene: THREE.Scene

  resources: Resources

  debug: Debug

  resource: GLTF

  debugFolder: GUI | null = null

  model: THREE.Object3D | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('House')
    }

    this.resource = this.resources.items.houseModel as GLTF

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.scene.add(this.model)
  }
}
