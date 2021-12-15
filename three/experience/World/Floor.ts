import * as THREE from 'three'

import type Experience from '..'
import type Resources from '../../utils/Resources'

type Textures = {
  [name: string]: THREE.Texture
}

export default class Floor {
  scene: THREE.Scene
  resources: Resources

  geometry: THREE.CircleGeometry | null = null
  textures: Textures = {}
  material: THREE.MeshStandardMaterial | null = null
  mesh: THREE.Mesh | null = null

  constructor(experience: Experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()

    // const floorColorTexture = textureLoader.load('textures/dirt/color.jpg')
    // floorColorTexture.encoding = THREE.sRGBEncoding
    // floorColorTexture.repeat.set(1.5, 1.5)
    // floorColorTexture.wrapS = THREE.RepeatWrapping
    // floorColorTexture.wrapT = THREE.RepeatWrapping

    // const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg')
    // floorNormalTexture.repeat.set(1.5, 1.5)
    // floorNormalTexture.wrapS = THREE.RepeatWrapping
    // floorNormalTexture.wrapT = THREE.RepeatWrapping

    // const floorGeometry = new THREE.CircleGeometry(5, 64)
    // const floorMaterial = new THREE.MeshStandardMaterial({
    //     map: floorColorTexture,
    //     normalMap: floorNormalTexture
    // })
    // const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    // floor.rotation.x = - Math.PI * 0.5
    // scene.add(floor)
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64)
  }

  setTextures() {
    this.textures.color = this.resources.items.grassColorTexture as THREE.Texture
    this.textures.color.encoding = THREE.sRGBEncoding
    this.textures.color.wrapS = THREE.RepeatWrapping
    this.textures.color.wrapT = THREE.RepeatWrapping
    this.textures.color.repeat.set(1.5, 1.5)

    this.textures.normal = this.resources.items.grassNormalTexture as THREE.Texture
    this.textures.normal.wrapS = THREE.RepeatWrapping
    this.textures.normal.wrapT = THREE.RepeatWrapping
    this.textures.normal.repeat.set(1.5, 1.5)
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry!, this.material!)
    this.mesh.rotation.x = -Math.PI * 0.5
    // this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
