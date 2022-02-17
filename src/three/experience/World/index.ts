import type Experience from '..'
import type Resources from '../../utils/Resources'
import Environment from './Environment'
import House from './House'

export default class World {
  scene: THREE.Scene

  resources: Resources

  house: House | null = null

  environment: Environment | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.resources.on('load', () => {
      this.house = new House(experience)
      this.environment = new Environment(experience)

      this.environment.updateMaterials()

      this.resources.emit('ready')
    })
  }
}
