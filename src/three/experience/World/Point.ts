import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '..'
import type Debug from '../../utils/Debug'
import type Resources from '../../utils/Resources'

export default class Point {
  scene: THREE.Scene

  resources: Resources

  debug: Debug

  geometry: THREE.SphereGeometry | null = null

  material: THREE.MeshBasicMaterial | null = null

  mesh: THREE.Mesh | null = null

  debugFolder: GUI | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.debug = experience.debug

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setDebug()
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.5, 32, 32)
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry!, this.material!)
    this.scene.add(this.mesh)
  }

  setDebug() {
    if (!this.debug.active) return

    this.debugFolder = this.debug.ui!.addFolder('Point')
    this.debugFolder!.add(this.mesh!.position, 'x', -10, 10)
    this.debugFolder!.add(this.mesh!.position, 'y', -10, 10)
    this.debugFolder!.add(this.mesh!.position, 'z', -10, 10)
  }
}
