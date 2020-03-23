import "./style/main.styl"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener("mousemove", _event => {
  cursor.x = _event.clientX / sizes.width - 0.5
  cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

/**
 * Objects
 */

/**
 * GroundFloor
 */
const groundFloorGroup = new THREE.Group()
scene.add(groundFloorGroup)

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(5, 2.5, 5, 1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xe8c7d6 })
)
walls.position.y = 1.25
groundFloorGroup.add(walls)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  20
)
camera.position.z = 8
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearAlpha(0)
const canvasContainer = document.querySelector(".canvas-js")
canvasContainer.appendChild(renderer.domElement)

/**
 * Camera Controls
 */
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

/**
 * Loop
 */
const loop = () => {
  window.requestAnimationFrame(loop)
  cameraControls.update()

  // Render
  renderer.render(scene, camera)
}

loop()


/**
 * CURSOR
 */

const container = document.getElementById('cursor')
const cursorCustom = container.querySelector('.cursor-wrapper')
const pointer = container.querySelector('.pointer')
let cursorPos = { x: 0, y: 0 }
let cursorOffset = { x: 0, y: 0 }

function syncCursor(elem = cursorCustom) {
	const transform = `translate(${cursorPos.x + cursorOffset.x}px, ${cursorPos.y + cursorOffset.y}px)`
  
  elem.style.transform = transform
}

document.addEventListener('mousemove', e => {
	cursorPos.x = e.clientX
  cursorPos.y = e.clientY
  syncCursor()
  syncCursor(pointer)
})
