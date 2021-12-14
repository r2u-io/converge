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

export default class Fox {
  scene: THREE.Scene
  resources: Resources
  time: Time
  debug: Debug

  resource: GLTF

  debugFolder: GUI | null = null
  model: THREE.Object3D | null = null

  animation: Animation | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources
    this.time = experience.time
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Fox')
    }

    // Setup
    this.resource = this.resources.items.foxModel as GLTF

    this.setModel()
    this.setAnimation()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.scale.set(0.02, 0.02, 0.02)
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  setAnimation() {
    this.animation = {
      mixer: new THREE.AnimationMixer(this.model!),
      actions: {},
      play: (name: string) => undefined
    }

    const [idle, walking, running] = this.resource.animations

    this.animation.actions = {}
    this.animation.actions.idle = this.animation.mixer.clipAction(idle)
    this.animation.actions.walking = this.animation.mixer.clipAction(walking)
    this.animation.actions.running = this.animation.mixer.clipAction(running)

    this.animation.actions.current = this.animation.actions.idle
    this.animation.actions.current.play()

    this.animation.play = (name) => {
      const newAction = this.animation!.actions[name]
      const oldAction = this.animation!.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1, false)

      this.animation!.actions.current = newAction
    }

    if (this.debug.active) {
      const debug = {
        playIdle: () => this.animation!.play('idle'),
        playWalking: () => this.animation!.play('walking'),
        playRunning: () => this.animation!.play('running')
      }

      this.debugFolder!.add(debug, 'playIdle').name('Idle')
      this.debugFolder!.add(debug, 'playWalking').name('Walking')
      this.debugFolder!.add(debug, 'playRunning').name('Running')
    }
  }

  update() {
    this.animation!.mixer.update(this.time.delta / 1000)
  }
}
