import type GUI from 'lil-gui'
import * as THREE from 'three'

import type Team from '.'
import type Debug from '../utils/Debug'
import Time from '../utils/Time'
import Renderer from './Renderer'

export default class Points {
  canvas: HTMLCanvasElement

  scene: THREE.Scene

  renderer: Renderer

  time: Time

  debug: Debug

  debugFolder: GUI | null = null

  count: number

  points: THREE.Points | null = null

  geometry: THREE.BufferGeometry | null = null

  material: THREE.PointsMaterial | null = null

  rotate = true

  axisPrimary: THREE.Vector3

  axisSecondary: THREE.Vector3

  constructor(team: Team) {
    this.canvas = team.canvas
    this.scene = team.scene
    this.renderer = team.renderer
    this.debug = team.debug
    this.time = team.time

    this.count = 30

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Points')
    }

    this.axisPrimary = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize()

    this.axisSecondary = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize()

    this.generate()
  }

  generate() {
    if (this.points !== null) {
      this.geometry!.dispose()
      this.material!.dispose()
      this.scene.remove(this.points)
    }

    this.geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(this.count * 3)
    const colors = new Float32Array(this.count * 3)

    const radius = 6

    Array(this.count)
      .fill(0)
      .forEach((_value, i) => {
        const phi = Math.PI * (1 + Math.sqrt(5)) * i
        const theta = Math.acos(1 - (2 * i) / this.count)

        positions[i * 3 + 0] = radius * Math.sin(theta) * Math.cos(phi)
        positions[i * 3 + 1] = radius * Math.cos(theta)
        positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi)

        colors[i * 3 + 0] = Math.random()
        colors[i * 3 + 1] = Math.random()
        colors[i * 3 + 2] = Math.random()
      })

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    this.material = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      vertexColors: true
    })

    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)

    this.canvas.addEventListener('mousedown', () => {
      this.rotate = false
    })
    this.canvas.addEventListener('mouseup', () => {
      this.rotate = true
    })
  }

  update() {
    if (this.rotate) {
      this.points!.rotateOnAxis(this.axisPrimary, 0.005)
      this.axisPrimary.applyAxisAngle(this.axisSecondary, Math.sin(this.time.elapsed / 1000) * 0.01)
    }
  }
}
