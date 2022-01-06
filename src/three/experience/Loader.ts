import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'

import type Experience from '.'
import type Debug from '../utils/Debug'
import type Resources from '../utils/Resources'
import Camera from './Camera'

export default class Loader {
  canvas: HTMLCanvasElement

  scene: THREE.Scene

  camera: Camera

  resources: Resources

  debug: Debug

  debugFolder: GUI | null = null

  material: THREE.ShaderMaterial | null = null

  screen: THREE.Mesh | null = null

  onShow: () => void

  constructor(experience: Experience, onProgress: (p: number) => void, onShow: () => void) {
    this.canvas = experience.canvas
    this.scene = experience.scene
    this.camera = experience.camera
    this.resources = experience.resources
    this.debug = experience.debug

    this.onShow = onShow

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Loader')
    }

    this.resources.on('progress', (p) => onProgress(p))
    this.resources.on('ready', () => gsap.delayedCall(1.0, () => onShow()))
  }

  // setScreen() {
  //   this.material = new THREE.ShaderMaterial({
  //     transparent: true,
  //     uniforms: {
  //       uAlpha: { value: 1.0 }
  //     },
  //     vertexShader: `
  //       void main() {
  //         gl_Position = vec4(position, 1.0);
  //       }
  //     `,
  //     fragmentShader: `
  //       uniform float uAlpha;

  //       void main() {
  //         gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
  //       }
  //     `
  //   })

  //   this.screen = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 1, 1), this.material)
  //   // this.screen.position.copy(this.camera.instance!.position)
  //   this.scene.add(this.screen)
  // }

  onLoad() {
    gsap.delayedCall(2, () => this.onShow())
  }
}
