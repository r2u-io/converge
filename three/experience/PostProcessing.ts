import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

import type GUI from 'lil-gui'
import type Experience from '.'
import type Debug from '../utils/Debug'

import type Sizes from '../utils/Sizes'
import type Camera from './Camera'
import type Renderer from './Renderer'

export default class PostProcessing {
  scene: THREE.Scene
  camera: Camera
  renderer: Renderer
  sizes: Sizes
  debug: Debug

  debugFolder: GUI | null = null

  instance: EffectComposer | null = null

  selectedObjects: THREE.Object3D[] = []
  outlinePass: OutlinePass | null = null

  renderTarget: THREE.WebGLMultisampleRenderTarget | THREE.WebGLRenderTarget | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.camera = experience.camera
    this.renderer = experience.renderer
    this.sizes = experience.sizes
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Post Processing')
    }

    this.setRenderTarget()
    this.setInstance()
    this.addRenderPass()
    this.addBloomPass()
    this.addOutlinePass()
    this.addShaderPass()
  }

  setRenderTarget() {
    if (
      this.renderer.instance!.getPixelRatio() < 2 &&
      this.renderer.instance!.capabilities.isWebGL2
    ) {
      this.renderTarget = new THREE.WebGLMultisampleRenderTarget(800, 600, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      })
    } else {
      this.renderTarget = new THREE.WebGLRenderTarget(800, 600, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      })
    }
  }

  setInstance() {
    this.instance = new EffectComposer(this.renderer.instance!, this.renderTarget!)
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  addRenderPass() {
    const renderPass = new RenderPass(this.scene, this.camera.instance!)
    this.instance!.addPass(renderPass)
  }

  addBloomPass() {
    const unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      0.3,
      1,
      0.6
    )

    unrealBloomPass.enabled = false

    if (this.debug.active) {
      this.debugFolder!.add(unrealBloomPass, 'enabled')
      this.debugFolder!.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001)
      this.debugFolder!.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001)
      this.debugFolder!.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001)
    }

    this.instance!.addPass(unrealBloomPass)
  }

  addOutlinePass() {
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      this.scene,
      this.camera.instance!
    )
    this.outlinePass.visibleEdgeColor.set('#d98911')
    this.instance!.addPass(this.outlinePass)
  }

  addShaderPass() {
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.instance!.addPass(gammaCorrectionPass)
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height)
    this.instance!.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update() {
    if (this.outlinePass) this.outlinePass.selectedObjects = this.selectedObjects
    this.instance!.render()
  }
}
