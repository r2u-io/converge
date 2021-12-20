import type Experience from '..'

import Resources from '../../utils/Resources'

import Box from './Box'
import Environment from './Environment'
import Floor from './Floor'
import House from './House'
import Point from './Point'

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
  box: Box | null = null

  point: Point | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.resources.on('ready', () => {
      // Setup
      // this.floor = new Floor(experience)
      this.house = new House(experience)
      this.environment = new Environment(experience)

      this.box = new Box(experience)

      if (experience.debug.active) this.point = new Point(experience)

      this.environment.updateMaterials()
    })
  }

  update() {
    if (this.box) this.box.update()
  }
}
