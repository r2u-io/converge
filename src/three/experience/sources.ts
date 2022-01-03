export interface Source {
  name: string
  type: string
  path: string | string[]
}

const Sources = [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      '/textures/environmentMap/px.jpg',
      '/textures/environmentMap/nx.jpg',
      '/textures/environmentMap/py.jpg',
      '/textures/environmentMap/ny.jpg',
      '/textures/environmentMap/pz.jpg',
      '/textures/environmentMap/nz.jpg'
    ]
  },
  {
    name: 'houseModel',
    type: 'gltf',
    path: '/models/house_draco_ktx2_etc1s_mipmap/House.gltf'
  }
]

export default Sources
