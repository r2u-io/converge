import * as THREE from 'three'

import type GUI from 'lil-gui'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'
import type Time from '../../utils/Time'
import Experience from '..'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

interface Animation {
  mixer: THREE.AnimationMixer
  actions: { [name: string]: THREE.AnimationAction }
  play: (name: string) => void
}

export default class House {
  scene: THREE.Scene
  resources: Resources
  time: Time
  debug: Debug

  resource: GLTF

  debugFolder: GUI | null = null
  model: THREE.Object3D | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources
    this.time = experience.time
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('House')
    }

    // Setup
    this.resource = this.resources.items.houseModel as GLTF

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
}
