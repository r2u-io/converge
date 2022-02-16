import type GUI from 'lil-gui'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

import type Experience from '.'
import type Debug from '../utils/Debug'
import type Sizes from '../utils/Sizes'
import { UnrealBloomPass } from '../utils/UnrealBloomPass.js'
import type Camera from './Camera'
import type Raycaster from './Raycaster'
import type Renderer from './Renderer'

interface PassUniform {
  [uniform: string]: {
    value: {
      x: number
      y: number
    }
  }
}

export default class PostProcessing {
  scene: THREE.Scene

  canvas: HTMLCanvasElement

  camera: Camera

  renderer: Renderer

  sizes: Sizes

  raycaster: Raycaster

  isMobile: boolean

  debug: Debug

  debugFolder: GUI | null = null

  instance: EffectComposer | null = null

  selectedObjects: THREE.Object3D[] = []

  outlinePass: OutlinePass | null = null

  passUniforms: PassUniform | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.canvas = experience.canvas
    this.camera = experience.camera
    this.renderer = experience.renderer
    this.raycaster = experience.raycaster
    this.isMobile = experience.isMobile
    this.sizes = experience.sizes
    this.debug = experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('Post Processing')
    }

    this.setInstance()
    this.addRenderPass()
    this.addBloomPass()
    this.addOutlinePass()
    this.addShaderPass()
    this.addAntiAliasPass()
  }

  setInstance() {
    this.instance = new EffectComposer(this.renderer.instance!)
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
      0.18,
      0,
      0.791
    )

    unrealBloomPass.enabled = true

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
    this.outlinePass.visibleEdgeColor.set('#d71488')
    this.outlinePass.hiddenEdgeColor.set('#d71488')
    this.outlinePass.edgeThickness = 0.1
    this.outlinePass.overlayMaterial.blending = THREE.CustomBlending

    this.instance!.addPass(this.outlinePass)
  }

  addShaderPass() {
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.instance!.addPass(gammaCorrectionPass)
  }

  addAntiAliasPass() {
    const fxaaPass = new ShaderPass(FXAAShader)
    this.passUniforms = fxaaPass.material.uniforms as PassUniform
    this.instance!.addPass(fxaaPass)

    const x = 1 / (this.sizes.width * this.renderer.instance!.getPixelRatio())
    const y = 1 / (this.sizes.height * this.renderer.instance!.getPixelRatio())

    this.passUniforms!.resolution.value.x = x
    this.passUniforms!.resolution.value.y = y
  }

  resize() {
    this.instance!.setSize(this.sizes.width, this.sizes.height)
    this.instance!.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const x = 1 / (this.sizes.width * this.renderer.instance!.getPixelRatio())
    const y = 1 / (this.sizes.height * this.renderer.instance!.getPixelRatio())

    this.passUniforms!.resolution.value.x = x
    this.passUniforms!.resolution.value.y = y
  }

  update() {
    if (this.selectedObjects.length) this.canvas.style.cursor = 'pointer'
    else this.canvas.style.cursor = 'default'
    if (this.isMobile) this.selectedObjects = this.raycaster.models.map((model) => model.model!)
    if (this.outlinePass) this.outlinePass.selectedObjects = this.selectedObjects
    this.instance!.render()
  }
}
