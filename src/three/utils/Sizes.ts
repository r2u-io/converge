import EventEmitter from 'events'

export default class Sizes extends EventEmitter {
  width: number

  height: number

  pixelRatio: number

  container: HTMLElement | null = null

  constructor(container?: HTMLElement) {
    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    if (container) {
      this.container = container

      this.width = this.container.clientWidth
      this.height = this.container.clientHeight
    }

    this.emit('resize')

    // Resize event
    window.addEventListener('resize', () => this.updateSizes())
  }

  updateSizes() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    if (this.container) {
      this.width = this.container.clientWidth
      this.height = this.container.clientHeight
    }

    this.emit('resize')
  }
}
