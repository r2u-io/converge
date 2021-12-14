import type Experience from '..'

import Resources from '../../utils/Resources'

import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

interface Props {
  scene: THREE.Scene
  resources: Resources
}

export default class World {
  scene: THREE.Scene
  resources: Resources

  floor: Floor | null = null
  fox: Fox | null = null
  environment: Environment | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor(experience)
      this.fox = new Fox(experience)
      this.environment = new Environment(experience)
    })
  }

  update() {
    if (this.fox) this.fox.update()
  }
}
