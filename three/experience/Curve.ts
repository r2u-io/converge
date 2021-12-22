import * as THREE from 'three'

import type Experience from '.'
import Debug from '../utils/Debug'

export default class Curve {
  scene: THREE.Scene
  debug: Debug

  points: THREE.Vector3[]
  instance: THREE.CatmullRomCurve3 | null = null

  progress: number = 0
  target: number = 1

  constructor(experience: Experience, points: THREE.Vector3[]) {
    this.scene = experience.scene
    this.debug = experience.debug

    this.points = points
    this.setInstance()

    if (this.debug.active) this.addHelper()
  }

  setInstance() {
    this.instance = new THREE.CatmullRomCurve3(this.points)
  }

  addHelper() {
    const geometry = new THREE.TubeGeometry(this.instance!, 500, 0.01, 100, false)
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    })
    const tube = new THREE.Mesh(geometry, material)
    this.scene.add(tube)
  }
}
