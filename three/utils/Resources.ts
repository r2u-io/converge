import EventEmitter from 'events'
import * as THREE from 'three'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Source } from '../experience/sources'

const DEFAULT_DRACO_DECODER_LOCATION = 'https://www.gstatic.com/draco/versioned/decoders/1.5.0/'
const DEFAULT_KTX2_TRANSCODER_LOCATION =
  'https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/'

interface Loaders {
  gltf: GLTFLoader
  texture: THREE.TextureLoader
  cubeTexture: THREE.CubeTextureLoader
}

type LoadedFile = GLTF | THREE.Texture | THREE.CubeTexture

export default class Resources extends EventEmitter {
  sources: Source[]
  items: { [name: string]: LoadedFile }
  toLoad: number
  loaded: number

  renderer: THREE.WebGLRenderer

  loaders: Loaders | null = null

  constructor(sources: Source[], renderer: THREE.WebGLRenderer) {
    super()

    this.renderer = renderer

    this.sources = sources

    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {
      gltf: new GLTFLoader(),
      texture: new THREE.TextureLoader(),
      cubeTexture: new THREE.CubeTextureLoader()
    }

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(
      process.env.NODE_ENV === 'production' ? DEFAULT_DRACO_DECODER_LOCATION : '/draco/'
    )

    const ktx2Loader = new KTX2Loader()
    ktx2Loader
      .setTranscoderPath(
        process.env.NODE_ENV === 'production' ? DEFAULT_KTX2_TRANSCODER_LOCATION : '/basis/'
      )
      .detectSupport(this.renderer)

    const basisLoader = new BasisTextureLoader()
    basisLoader
      .setTranscoderPath(
        process.env.NODE_ENV === 'production' ? DEFAULT_KTX2_TRANSCODER_LOCATION : '/basis/'
      )
      .detectSupport(this.renderer)

    this.loaders.gltf.setDRACOLoader(dracoLoader)
    this.loaders.gltf.setKTX2Loader(ktx2Loader)
  }

  startLoading() {
    this.sources.forEach((source) => {
      switch (source.type) {
        case 'gltf':
          this.loaders!.gltf.load(source.path as string, (file) => this.sourceLoaded(source, file))
        case 'texture':
          this.loaders!.texture.load(source.path as string, (file) =>
            this.sourceLoaded(source, file)
          )
        case 'cubeTexture':
          this.loaders!.cubeTexture.load(source.path as string[], (file) =>
            this.sourceLoaded(source, file)
          )
      }
    })
  }

  sourceLoaded(source: Source, file: LoadedFile) {
    this.items[source.name] = file
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.emit('ready')
    }
  }
}
