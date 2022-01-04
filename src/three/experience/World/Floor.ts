import * as THREE from 'three'

import type Experience from '..'

export default class Floor {
  name: string

  constructor(experience: Experience, name: string) {
    this.name = name
  }
}
