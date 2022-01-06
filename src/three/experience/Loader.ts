import gsap from 'gsap'
import GUI from 'lil-gui'

import type Experience from '.'
import type Resources from '../utils/Resources'

// import * as THREE from 'three'
// import type Debug from '../utils/Debug'
// import type Camera from './Camera'

export default class Loader {
  canvas: HTMLCanvasElement

  resources: Resources

  debugFolder: GUI | null = null

  // scene: THREE.Scene
  // camera: Camera
  // debug: Debug
  // material: THREE.ShaderMaterial | null = null
  // screen: THREE.Mesh | null = null

  onShow: () => void

  constructor(experience: Experience, onProgress: (p: number) => void, onShow: () => void) {
    this.canvas = experience.canvas
    this.resources = experience.resources
    // this.debug = experience.debug
    // this.scene = experience.scene
    // this.camera = experience.camera

    this.onShow = onShow

    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui!.addFolder('Loader')
    // }

    // this.setScreen()

    this.resources.on('progress', (p) => onProgress(p))
    this.resources.on('ready', () => gsap.delayedCall(1.0, () => onShow()))
  }

  //  If we want to use a loading screen on THREE.js with custom shader:
  //  Code for a black screen fading out on load
  //
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
  //   this.screen.position.copy(this.camera.instance!.position)
  //   if(this.debug.active) this.debutFolder!.add(this.material!.uniforms, 'uAlpha').min(0).max(1).step(0.01)
  //   this.scene.add(this.screen)
  // }

  // onLoad() {
  //   gsap.delayedCall(0.5, () => {
  //     gsap.to(this.material!.uniforms.uAlpha, {
  //       duration: 3,
  //       value: 0,
  //       onComplete: () => this.onShow()
  //     })
  //   })
  // }
}
