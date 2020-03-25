import "./style/main.styl"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Piano from "./javascript/Piano.js"
import Guitar from "./javascript/Guitar.js"
import Box from "./javascript/Box.js"
import Drums from "./javascript/Drums.js"
import Bass from "./javascript/Bass.js"
import { TweenLite, TimelineLite } from "gsap/all"
import { Mesh, Group } from "three"
import startWebsite from "./javascript/Start.js"

/**
 * Sounds
 */
// PIANO
import pianoAudio from "./audio/piano.wav"
// GUITAR
import guitarAudio from "./audio/guitar.wav"
// BASS
import bassAudio from "./audio/bass.wav"
// DRUMS
import drumsAudio from "./audio/drums.wav"
import drumsPercAudio from "./audio/drumsPerc.wav"
import drumsKickAudio from "./audio/drumsKick.wav"

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

const ambientlight = new THREE.AmbientLight(0xffffff, 0.8) // soft white light
ambientlight.castShadow = true
scene.add(ambientlight)

// Box Piano Light
const pianoLight = new THREE.PointLight(0x8b84e5, 1)
pianoLight.position.set(0, 0.5, 0)
pianoLight.castShadow = true

scene.add(pianoLight)

// Directional light test

// const directionalRightLight = new THREE.DirectionalLight( 0xff0000, 0.8 );
// directionalRightLight.position.set( 5, 5, 0 );
// directionalRightLight.castShadow = true
// scene.add( directionalRightLight );

// const directionalLeftLight = new THREE.DirectionalLight(0xff0000, 0.8)
// directionalLeftLight.position.set(-5, 5, 0)
// directionalLeftLight.castShadow = true
// scene.add(directionalLeftLight)

// const directionalBackLight = new THREE.DirectionalLight(0xffffff, 0.4)
// directionalBackLight.position.set(0, 5, -5)
// directionalBackLight.castShadow = true
// scene.add(directionalBackLight)

// const directionalFrontLight = new THREE.DirectionalLight(0xffffff, 0.3)
// directionalFrontLight.position.set(0, 0, 10)
// directionalFrontLight.castShadow = true
// scene.add(directionalFrontLight)

// const directionalFrontLight = new THREE.DirectionalLightHelper(
//   directionalFrontLight
// )
// scene.add(directionalFrontLight)

/**
 * Objects
 */

const boxContent = new Group()

// EACH BOX x4

const box = new Box()
box.group.position.set(0.05, -1, 0)
box.group.castShadow = true
boxContent.add(box.group)
const box2 = new Box()
box2.group.position.set(2.55, -1, 0)
box2.group.castShadow = true
boxContent.add(box2.group)
const box3 = new Box()
box3.group.position.set(2.55, 1.45, 0)
box3.group.castShadow = true
boxContent.add(box3.group)
const box4 = new Box()
box4.group.position.set(0.05, 1.45, 0)
box4.group.castShadow = true
boxContent.add(box4.group)

boxContent.position.set(-1.25, -1.25, 0)

scene.add(boxContent)

//  INSTRUMENTS INSIDE BOX

const piano = new Piano()
box.group.add(piano.group)
const guitar = new Guitar()
box2.group.add(guitar.group)
const drums = new Drums()
box3.group.add(drums.group)
const bass = new Bass()
box4.group.add(bass.group)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  20
)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  alpha: true
})
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
 * AUDIO VARIABLES
 */

const pianoAudioInstance = new Audio()
pianoAudioInstance.src = pianoAudio
pianoAudioInstance.loop = true

const guitarAudioInstance = new Audio()
guitarAudioInstance.src = guitarAudio
guitarAudioInstance.loop = true

const bassAudioInstance = new Audio()
bassAudioInstance.src = bassAudio
bassAudioInstance.loop = true

// DRUMS
const drumsAudioInstance = new Audio()
drumsAudioInstance.src = drumsAudio
drumsAudioInstance.loop = true

const drumsKickAudioInstance = new Audio()
drumsKickAudioInstance.src = drumsKickAudio
drumsKickAudioInstance.loop = true

const drumsPercAudioInstance = new Audio()
drumsPercAudioInstance.src = drumsPercAudio
drumsPercAudioInstance.loop = true

const setDefaultVolume = (volume) => {
  drumsAudioInstance.volume = volume
  drumsKickAudioInstance.volume = volume
  drumsPercAudioInstance.volume = volume
  pianoAudioInstance.volume = volume
  guitarAudioInstance.volume = volume
  bassAudioInstance.volume = volume
}

const start = () => {
  console.log("yo")
  setDefaultVolume(0.5)
  guitarAudioInstance.play()
  bassAudioInstance.play()
  pianoAudioInstance.play()
  drumsAudioInstance.play()
  drumsPercAudioInstance.play()
  drumsKickAudioInstance.play()
  // guitarAudio.play()
}

startWebsite(start)

/**
 * Click On Instruments
 */
let hasPlayedZoomAnimation = false
let isZooming = false

//cameraFunction
function instrumentZoom(posX, posY) {
  setTimeout(() => {
    isZooming = false
  }, 1000)
  TweenLite.to(boxContent.position, 1, {
    x: boxContent.position.x + posX,
    y: boxContent.position.y + posY,
    z: camera.position.z - 2,
    ease: "Power3.easeInOut"
  })
  hasPlayedZoomAnimation = true
  isZooming = true
  setDefaultVolume(0.1)
}

function originalZoom(posX, posY, posZ) {
  setTimeout(() => {
    isZooming = false
  }, 1000)
  TweenLite.to(boxContent.position, 1, {
    x: boxContent.position.x + posX,
    y: boxContent.position.y + posY,
    z: camera.position.z + posZ,

    ease: "Power3.easeInOut"
  })
  hasPlayedZoomAnimation = false
  isZooming = true
  setDefaultVolume(0.5)
}

//PIANO
let hoverPiano = false
document.addEventListener("click", () => {
  if (isZooming) return
  if (hoverPiano && hasPlayedZoomAnimation === false) {
    instrumentZoom(1.25, 1.25)
    pianoAudioInstance.volume = 1
  } else if (hoverPiano && hasPlayedZoomAnimation === true) {
    originalZoom(-1.25, -1.25, -6)
  }
})

//GUITAR
let hoverGuitar = false
document.addEventListener("click", () => {
  if (isZooming) return
  if (hoverGuitar && hasPlayedZoomAnimation === false) {
    instrumentZoom(-1.25, 1.25)
    guitarAudioInstance.volume = 1
  } else if (hoverGuitar && hasPlayedZoomAnimation === true) {
    originalZoom(1.25, -1.25, -6)
  }
})
//DRUMS
let hoverDrums = false
document.addEventListener("click", () => {
  if (isZooming) return
  if (hoverDrums && hasPlayedZoomAnimation === false) {
    instrumentZoom(-1.25, -1.25)
    drumsAudioInstance.volume = 1
  } else if (hoverDrums && hasPlayedZoomAnimation === true) {
    originalZoom(1.25, 1.25, -6)
  }
})
//BASS
let hoverBass = false
document.addEventListener("click", () => {
  if (isZooming) return
  if (hoverBass && hasPlayedZoomAnimation === false) {
    instrumentZoom(1.25, -1.25)
    bassAudioInstance.volume = 1
  } else if (hoverBass && hasPlayedZoomAnimation === true) {
    originalZoom(-1.25, 1.25, -6)
  }
})

/**
 * Loop
 */
const raycaster = new THREE.Raycaster()

const loop = () => {
  window.requestAnimationFrame(loop)
  cameraControls.update()

  // Cursor raycasting
  const raycasterCursor = new THREE.Vector2(cursor.x * 2, -cursor.y * 2)
  raycaster.setFromCamera(raycasterCursor, camera)

  //PIANO
  const intersectsPiano = raycaster.intersectObject(box.group, true)
  if (intersectsPiano.length) {
    hoverPiano = true
  } else {
    hoverPiano = false
  }
  //GUITAR
  const intersectsGuitar = raycaster.intersectObject(box2.group, true)
  if (intersectsGuitar.length) {
    hoverGuitar = true
  } else {
    hoverGuitar = false
  }
  //DRUMS
  const intersectsDrums = raycaster.intersectObject(box3.group, true)
  if (intersectsDrums.length) {
    hoverDrums = true
  } else {
    hoverDrums = false
  }
  //DRUMS
  const intersectsBass = raycaster.intersectObject(box4.group, true)
  if (intersectsBass.length) {
    hoverBass = true
  } else {
    hoverBass = false
  }

  // Render
  renderer.render(scene, camera)
}

loop()

/**
 * MENU
 */

const aboutButton = document.querySelector(".about-button-js")
const modalAbout = document.querySelector(".modal-about-js")
const closeModalButton = document.querySelector(".close-js")

aboutButton.addEventListener("click", () => {
  openModal()
})

closeModalButton.addEventListener("click", () => {
  closeModal()
})

function openModal() {
  modalAbout.classList.add("openModal")
}

function closeModal() {
  modalAbout.classList.remove("openModal")
  modalAbout.classList.add("closeModal")
  console.log("yo")
}
