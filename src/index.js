import "./style/main.styl"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Piano from "./javascript/Piano.js"
import Guitar from "./javascript/Piano.js"
import Box from "./javascript/Box.js"
import { Mesh } from "three"

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

const ambientlight = new THREE.AmbientLight(0xffffff, 0.2) // soft white light
ambientlight.castShadow = true
scene.add(ambientlight)

var pianoLight = new THREE.PointLight(0x8b84e5, 1)
pianoLight.position.set(0, 0, 0)
pianoLight.castShadow = true

scene.add(pianoLight)

// var directionalRightLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// directionalRightLight.position.set( 5, 5, 0 );
// directionalRightLight.castShadow = true
// scene.add( directionalRightLight );

var directionalLeftLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLeftLight.position.set(-5, 5, 0)
directionalLeftLight.castShadow = true
scene.add(directionalLeftLight)

// var directionalBackLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
// directionalBackLight.position.set( 0, 5, -5 );
// directionalBackLight.castShadow = true
// scene.add( directionalBackLight );

var directionalFrontLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalFrontLight.position.set(0, 0, 10)
directionalFrontLight.castShadow = true
scene.add(directionalFrontLight)

const pointLight = new THREE.PointLight(0xff0000, 0.5)
scene.add(pointLight)

var directionalFrontLight = new THREE.DirectionalLightHelper(
  directionalFrontLight
)
scene.add(directionalFrontLight)

/**
 * Objects
 */
const box = new Box()
scene.add(box.group)
const box2 = new Box()
scene.add(box2.group)

// //  PIANO

const piano = new Piano()
scene.add(piano.group)

// //  Guitar

// const guitar = new Guitar()
// scene.add(guitar.group)

// const raycaster = new THREE.Raycaster()
/**
 * GroundFloor
 */
// const groundFloorGroup = new THREE.Group()
// scene.add(groundFloorGroup)

// const walls = new THREE.Mesh(
//   new THREE.BoxGeometry(5, 2.5, 5, 1, 1, 1),
//   new THREE.MeshStandardMaterial({ color: 0xe8c7d6 })
// )
// walls.position.y = 1.25
// groundFloorGroup.add(walls)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  20
)
camera.position.z = 3
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
 * Click on piano
 */
let hoverPiano = false
document.addEventListener("click", () => {
  if (hoverPiano) {
    console.log("click sur le canard")

    TweenLite.to(piano.piano.position, 1, {
      y: piano.piano.position.y - 1,
      x: piano.piano.position.x - 1,
      ease: "Power3.easeInOut"
    })

    TweenLite.to(piano.piano.rotation, 1, {
      y: Math.PI,
      ease: "Power3.easeInOut"
    })
  }
})

/**
 * Loop
 */
const loop = () => {
  window.requestAnimationFrame(loop)
  cameraControls.update()

  // Cursor raycasting
  // const raycasterCursor = new THREE.Vector2(cursor.x * 2, -cursor.y * 2)
  // raycaster.setFromCamera(raycasterCursor, camera)

  // const intersects = raycaster.intersectObject(piano.group, true)
  // if (intersects.length) {
  //   hoverPiano = true
  // } else {
  //   hoverPiano = false
  // }

  // Render
  renderer.render(scene, camera)
}

loop()

/**
 * CURSOR
 */

// const container = document.getElementById("cursor")
// const cursorCustom = container.querySelector(".cursor-wrapper")
// const pointer = container.querySelector(".pointer")
// let cursorPos = { x: 0, y: 0 }
// let cursorOffset = { x: 0, y: 0 }

// function syncCursor(elem = cursorCustom) {
//   const transform = `translate(${cursorPos.x +
//     cursorOffset.x}px, ${cursorPos.y + cursorOffset.y}px)`

//   elem.style.transform = transform
// }

// document.addEventListener("mousemove", e => {
//   cursorPos.x = e.clientX
//   cursorPos.y = e.clientY
//   syncCursor()
//   syncCursor(pointer)
// })

/**
 * Start
 */

const startModal = document.querySelector(".start-js")
const startButton = document.querySelector(".start-button-js")

startModal.addEventListener("animationend", () => {
  startModal.classList.add("hidden")
})

startButton.addEventListener("click", () => {
  start()
  startModal.classList.add("fadeOut")
})

// SOUND
import pianoAudio from "./audio/piano.wav"
import guitarAudio from "./audio/guitar.wav"
import bassAudio from "./audio/bass.wav"
import drumsAudio from "./audio/drums.wav"
// import guitarAudio from './../audio/guitar.mp3'
const pianoAudioInstance = new Audio()
pianoAudioInstance.src = pianoAudio

const guitarAudioInstance = new Audio()
guitarAudioInstance.src = guitarAudio

const bassAudioInstance = new Audio()
bassAudioInstance.src = bassAudio

const drumsAudioInstance = new Audio()
drumsAudioInstance.src = drumsAudio

const start = () => {
  console.log("yo")
  guitarAudioInstance.play()
  bassAudioInstance.play()
  pianoAudioInstance.play()
  drumsAudioInstance.play()
  // guitarAudio.play()
}
