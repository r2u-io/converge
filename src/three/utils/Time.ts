import EventEmitter from 'events'

import Stats from 'stats.js'

export default class Time extends EventEmitter {
  start: number

  current: number

  elapsed: number

  delta: number

  stats: Stats

  constructor(stats: boolean) {
    super()

    this.stats = new Stats()
    this.stats.showPanel(0)
    if (stats) document.body.appendChild(this.stats.dom)

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 1

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    this.stats.begin()
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.emit('tick')

    window.requestAnimationFrame(() => this.tick())

    this.stats.end()
  }
}
