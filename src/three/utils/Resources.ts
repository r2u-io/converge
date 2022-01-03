import EventEmitter from 'events'

import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Source } from '../experience/sources'

const DEFAULT_DRACO_DECODER_LOCATION = 'https://www.gstatic.com/draco/versioned/decoders/1.5.0/'

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

  loaders: Loaders | null = null

  constructor(sources: Source[]) {
    super()

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
    this.loaders.gltf.setDRACOLoader(dracoLoader)
  }

  startLoading() {
    this.sources.forEach((source) => {
      switch (source.type) {
        case 'gltf':
          this.loaders!.gltf.load(source.path as string, (file) => this.sourceLoaded(source, file))
          break
        case 'texture':
          this.loaders!.texture.load(source.path as string, (file) =>
            this.sourceLoaded(source, file)
          )
          break
        case 'cubeTexture':
          this.loaders!.cubeTexture.load(source.path as string[], (file) =>
            this.sourceLoaded(source, file)
          )
          break
        default:
          break
      }
    })
  }

  sourceLoaded(source: Source, file: LoadedFile) {
    this.items[source.name] = file
    this.loaded += 1

    if (this.loaded === this.toLoad) {
      this.emit('ready')
    }
  }
}
