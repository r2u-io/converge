import type Experience from '..'

import Resources from '../../utils/Resources'

import Environment from './Environment'
import Floor from './Floor'
import House from './House'

interface Props {
  scene: THREE.Scene
  resources: Resources
}

export default class World {
  scene: THREE.Scene
  resources: Resources

  floor: Floor | null = null
  house: House | null = null
  environment: Environment | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.resources.on('ready', () => {
      // Setup
      // this.floor = new Floor(experience)
      this.house = new House(experience)
      this.environment = new Environment(experience)
    })
  }
}
