import * as THREE from 'three'

export default class Curve {
  points: THREE.Vector3[]

  defaultPoints: THREE.Vector3[]

  instance: THREE.CatmullRomCurve3 | null = null

  progress = 0

  helper: THREE.Mesh | null = null

  constructor(points: THREE.Vector3[]) {
    this.points = points
    this.defaultPoints = points
    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.CatmullRomCurve3(this.points)
  }

  setFirstPoint(point: THREE.Vector3) {
    this.points = [point, ...this.defaultPoints.slice(1)]
    this.instance = null
    this.setInstance()
  }

  setLastPoint(point: THREE.Vector3) {
    this.points = [...this.defaultPoints.slice(0, -1), point]
    this.instance = null
    this.setInstance()
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

    this.helper = tube
  }
}
