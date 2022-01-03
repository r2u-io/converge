import type Experience from '..'

import Environment from './Environment'
import House from './House'
import Point from './Point'

import type Resources from '../../utils/Resources'
import type Model from './Model'

export default class World {
  scene: THREE.Scene
  resources: Resources

  house: House | null = null
  environment: Environment | null = null

  point: Point | null = null

  models: Model[] = []

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.resources.on('ready', () => {
      this.house = new House(experience)
      this.environment = new Environment(experience)

      if (experience.debug.active) this.point = new Point(experience)

      this.environment.updateMaterials()
    })
  }

  update() {
    this.models.forEach((model) => model.update())
  }
}
