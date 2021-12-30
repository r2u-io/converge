import * as THREE from 'three'

const PI_2 = Math.PI / 2
const euler = new THREE.Euler(0, 0, 0, 'YXZ')
const vec = new THREE.Vector3()
const direction = new THREE.Vector3(0, 0, -1)

const changeEvent = { type: 'change' }
const lockEvent = { type: 'lock' }
const unlockEvent = { type: 'unlock' }

export class PointerLockControls extends THREE.EventDispatcher {
  public camera: THREE.Camera
  public domElement: Element
  public isLocked: boolean = false

  private _sensitivity: number

  constructor(camera: THREE.Camera, domElement: Element) {
    super()

    if (domElement === undefined) {
      console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.')
      domElement = document.body
    }

    this.camera = camera
    this.domElement = domElement
    this._sensitivity = 1.0

    this.connect()
  }

  set sensitivity(value: number) {
    this._sensitivity = Math.round(value * 100) / 100
    if (this._sensitivity < 0.01) this.sensitivity = 0.01
    if (this._sensitivity > 2.0) this.sensitivity = 2.0
  }

  get sensitivity() {
    return this._sensitivity
  }

  public connect() {
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('pointerlockchange', this.onPointerlockChange, false)
    document.addEventListener('pointerlockerror', this.onPointerlockError, false)
  }

  public disconnect() {
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('pointerlockchange', this.onPointerlockChange, false)
    document.removeEventListener('pointerlockerror', this.onPointerlockError, false)
  }

  public dispose() {
    this.disconnect()
  }

  public getObject() {
    // retaining this method for backward compatibility
    return this.camera
  }

  public getDirection = (v: THREE.Vector3) => {
    return v.copy(direction).applyQuaternion(this.camera.quaternion)
  }

  public moveForward(distance: number): void {
    // move forward parallel to the xz-plane
    // assumes camera.up is y-up
    const looking = this.camera.up.clone().applyQuaternion(this.camera.quaternion)
    vec.setFromMatrixColumn(this.camera.matrix, 0)
    vec.crossVectors(looking, vec)
    this.camera.position.addScaledVector(vec, distance)
  }

  public moveRight(distance: number): void {
    vec.setFromMatrixColumn(this.camera.matrix, 0)
    this.camera.position.addScaledVector(vec, distance)
  }

  public lock(): void {
    this.domElement.requestPointerLock()
  }

  public unlock(): void {
    document.exitPointerLock()
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.isLocked === false) return

    var movementX =
      event.movementX || (event as any).mozMovementX || (event as any).webkitMovementX || 0
    var movementY =
      event.movementY || (event as any).mozMovementY || (event as any).webkitMovementY || 0

    euler.setFromQuaternion(this.camera.quaternion)

    euler.y -= movementX * 0.002 * this._sensitivity
    euler.x -= movementY * 0.002 * this._sensitivity

    euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x))

    this.camera.quaternion.setFromEuler(euler)

    this.dispatchEvent(changeEvent)
  }

  private onPointerlockChange = () => {
    if (document.pointerLockElement === this.domElement) {
      this.dispatchEvent(lockEvent)
      this.isLocked = true
    } else {
      this.dispatchEvent(unlockEvent)
      this.isLocked = false
    }
  }

  private onPointerlockError = () => {
    console.error('THREE.PointerLockControls: Unable to use Pointer Lock API')
  }
}
