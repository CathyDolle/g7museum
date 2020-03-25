import "./style/main.styl"
import * as THREE from "three"
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js"
import Piano from "./javascript/Piano.js"
import Guitar from "./javascript/Guitar.js"
import Box from "./javascript/Box.js"
import Drums from "./javascript/Drums.js"
import Bass from "./javascript/Bass.js"
import {
  TweenLite,
  TimelineLite
} from 'gsap/all'
import {
  Mesh,
  Group
} from "three"
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
 * Click On Instruments
 */
//cameraFunction
function instrumentZoom(x, y) {
  TweenLite.to(boxContent.position, 1, {
    x: boxContent.position.x = x,
    y: boxContent.position.y = y,
    z: camera.position.z - 2,

    ease: "Power3.easeInOut"
  })
}

//PIANO
let hoverPiano = false
document.addEventListener("click", () => {
  if (hoverPiano) {
    console.log("click sur le piano")

    TweenLite.to(boxContent.position, 1, {
      x: boxContent.position.x + 1.25,
      y: boxContent.position.y + 1.25,
      z: camera.position.z - 2,

      ease: "Power3.easeInOut"
    })
  }
})
//GUITAR
let hoverGuitar = false
document.addEventListener("click", () => {
  if (hoverGuitar) {
    console.log("click sur le Guitar")

    TweenLite.to(boxContent.position, 1, {
      x: boxContent.position.x - 1.25,
      y: boxContent.position.y + 1.25,
      z: camera.position.z - 2,

      ease: "Power3.easeInOut"
    })
  }
})
//DRUMS
let hoverDrums = false
document.addEventListener("click", () => {
  if (hoverDrums) {
    console.log("click sur le Drums")

    TweenLite.to(boxContent.position, 1, {
      x: boxContent.position.x - 1.25,
      y: boxContent.position.y - 1.25,
      z: camera.position.z - 2,

      ease: "Power3.easeInOut"
    })
  }
})
//BASS
let hoverBass = false
document.addEventListener("click", () => {
  if (hoverBass) {
    console.log("click sur le Bass")

    TweenLite.to(boxContent.position, 1, {
      x: boxContent.position.x + 1.25,
      y: boxContent.position.y - 1.25,
      z: camera.position.z - 2,

      ease: "Power3.easeInOut"
    })
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
 * Start first page/ playing sound
 */

// const startModal = document.querySelector(".start-js")
// const startButton = document.querySelector(".start-button-js")

// startModal.addEventListener("animationend", () => {
//   startModal.classList.add("hidden")
// })

// startButton.addEventListener("click", () => {
//   start()
//   startModal.classList.add("fadeOut")
// })

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

/**
 * OKAY AUDIO
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

const start = () => {
  console.log("yo")
  guitarAudioInstance.play()
  bassAudioInstance.play()
  pianoAudioInstance.play()
  drumsAudioInstance.play()
  drumsPercAudioInstance.play()
  drumsKickAudioInstance.play()
  // guitarAudio.play()
}