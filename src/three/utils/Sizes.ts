import EventEmitter from 'events'

export default class Sizes extends EventEmitter {
  width: number

  height: number

  pixelRatio: number

  constructor() {
    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event
    window.addEventListener('resize', () => {
      // Update sizes
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.emit('resize')
    })
  }
}
