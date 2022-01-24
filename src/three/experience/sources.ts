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
  },
  {
    name: 'outlineModel',
    type: 'gltf',
    path: '/models/outline/Outline.gltf'
  },
  {
    name: 'nft_01',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_02',
    type: 'texture',
    path: 'https://f8n-ipfs-production.imgix.net/QmeJwKevYMdAAquUMLZJgGy8sS37nPtf5kAvWD3diN3xJM/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680'
  },
  {
    name: 'nft_03',
    type: 'texture',
    path: 'https://mkpcdn.com/1000x/eb5a4303f1fa34f8bffbadcc36ffa3b8_132651.jpg'
  },
  {
    name: 'nft_04',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_05',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_06',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_07',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_08',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_09',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_10',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_11',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_12',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_13',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_14',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_15',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_16',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_17',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_18',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_19',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_20',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_21',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_22',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_23',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  },
  {
    name: 'nft_24',
    type: 'texture',
    path: 'https://lh3.googleusercontent.com/j3M5WTERnDIWvNOOkOiu5_kZy-E1a1fyDDhgVWxRCC6SvNycSTyII11_lYi-oYLvSNSW9AwcnRSO5uJ_aupWVZjZHGMw8fuZ1EFT=w366'
  }
]

export default Sources
