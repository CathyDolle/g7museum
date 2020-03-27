import "./style/main.styl"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Piano from "./javascript/Piano.js"
import Guitar from "./javascript/Guitar.js"
import Box from "./javascript/Box.js"
import Drums from "./javascript/Drums.js"
import Bass from "./javascript/Bass.js"
import { TweenLite, TimelineMax } from "gsap/all"

import { Mesh, Group } from "three"
import startWebsite from "./javascript/Start.js"
import font from "three/examples/fonts/helvetiker_bold.typeface.json"

/**
 * Sounds1
 */

// PIANO
import pianoAudio from "./audio/sound1/piano.wav"
// GUITAR
import guitarAudio from "./audio/sound1/guitar.wav"
// BASS
import bassAudio from "./audio/sound1/bass.wav"
// DRUMS
import drumsAudio from "./audio/sound1/drums.wav"
import drumsPercAudio from "./audio/sound1/drumsPerc.wav"
import drumsKickAudio from "./audio/sound1/drumsKick.wav"

/**
 * Sounds2
 */
//PIANO
import pianoAudio2 from "./audio/sound2/piano.wav"

// GUITAR
import guitarAudio2 from "./audio/sound2/mainChords.wav"

// BASS
import bassAudio2 from "./audio/sound2/bass.wav"
// DRUMS
import drumsAudio2 from "./audio/sound2/drums.wav"

/**
 * Sounds3
 */

// GUITAR
import guitarAudio3 from "./audio/sound3/guitar.wav"
// BASS
import bassAudio3 from "./audio/sound3/bass.wav"
// DRUMS
import drumsAudio3 from "./audio/sound3/drums.wav"

import drumsKickAudio3 from "./audio/sound3/drumsKick.wav"

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

let hasStarted = false
/**
 * Lights
 */

const ambientlight = new THREE.AmbientLight(0xffffff, 0.4) // soft white light
ambientlight.castShadow = true
scene.add(ambientlight)

// Box Piano Light
const pianoLight = new THREE.PointLight(0xffa2fb, 1.2, 3)
pianoLight.position.set(0, 1.05, 0)
pianoLight.castShadow = true

// Box Guitar Light
const guitarLight = new THREE.PointLight(0x6cccff, 1.2, 3)
guitarLight.position.set(0, 1.05, 0)

guitarLight.castShadow = true

// Box Drums Light
const drumsLight = new THREE.PointLight(0x9890ff, 1.2, 3)
drumsLight.position.set(0, 1.05, 0)
drumsLight.castShadow = true

// Box Bass Light
const bassLight = new THREE.PointLight(0xffce80, 1.2, 3)
bassLight.position.set(0, 1.05, 0)
bassLight.castShadow = true

// HELPERS

// const bassLightHelper = new THREE.PointLightHelper(bassLight)
// scene.add(bassLightHelper)

// const pianoLightHelper = new THREE.PointLightHelper(pianoLight)
// scene.add(pianoLightHelper)

// const drumsLightHelper = new THREE.PointLightHelper(drumsLight)
// scene.add(drumsLightHelper)

// const guitarLightHelper = new THREE.PointLightHelper(guitarLight)
// scene.add(guitarLightHelper)

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
box4.group.add(guitar.group)
const drums = new Drums()
box3.group.add(drums.group)
const bass = new Bass()
box2.group.add(bass.group)

// ADD LIGHT

box.group.add(pianoLight)
box2.group.add(bassLight)
box3.group.add(drumsLight)
box4.group.add(guitarLight)

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
renderer.outputEncoding = THREE.sRGBEncoding
renderer.gammaFactor = 2.2

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

//SOund 1
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

//Sound 2

const guitarAudio2Instance = new Audio()
guitarAudio2Instance.src = guitarAudio2
guitarAudio2Instance.loop = true
const pianoAudio2Instance = new Audio()
pianoAudio2Instance.src = pianoAudio2
pianoAudio2Instance.loop = true

const bassAudio2Instance = new Audio()
bassAudio2Instance.src = bassAudio2
bassAudio2Instance.loop = true

// DRUMS
const drumsAudio2Instance = new Audio()
drumsAudio2Instance.src = drumsAudio2
drumsAudio2Instance.loop = true

//Sound 3

const guitarAudio3Instance = new Audio()
guitarAudio3Instance.src = guitarAudio3
guitarAudio3Instance.loop = true

const bassAudio3Instance = new Audio()
bassAudio3Instance.src = bassAudio3
bassAudio3Instance.loop = true

// DRUMS
const drumsAudio3Instance = new Audio()
drumsAudio3Instance.src = drumsAudio3
drumsAudio3Instance.loop = true
const drumsKickAudio3Instance = new Audio()
drumsKickAudio3Instance.src = drumsKickAudio3
drumsKickAudio3Instance.loop = true

let currentSoundPlayed = 1

const setDefaultVolume = (volume, soundNumber = 1) => {
  if (soundNumber == 1) {
    //Sound 1
    drumsAudioInstance.volume = volume
    drumsKickAudioInstance.volume = volume
    drumsPercAudioInstance.volume = volume
    pianoAudioInstance.volume = volume
    guitarAudioInstance.volume = volume
    bassAudioInstance.volume = volume
  } else if (soundNumber == 2) {
    //Sound 2
    guitarAudio2Instance.volume = volume
    pianoAudio2Instance.volume = volume
    bassAudio2Instance.volume = volume
    drumsAudio2Instance.volume = volume
    pianoAudioInstance.volume = 0
  } else {
    //Sound 3
    guitarAudio3Instance.volume = volume
    bassAudio3Instance.volume = volume
    drumsAudio3Instance.volume = volume
    drumsKickAudio3Instance.volume = volume
    pianoAudioInstance.volume = 0
  }
}

// MUTE/UNMUTE
const muteSound = document.querySelector(".mute-js")
const unmuteSound = document.querySelector(".unmute-js")
let isMuted = false

muteSound.addEventListener("mouseover", () => {
  hasStarted = false
})

unmuteSound.addEventListener("mouseover", () => {
  hasStarted = false
})

muteSound.addEventListener("mouseleave", () => {
  hasStarted = true
})

unmuteSound.addEventListener("mouseleave", () => {
  hasStarted = true
})

muteSound.addEventListener("click", () => {
  isMuted = false
  setDefaultVolume(1, currentSoundPlayed)
  muteSound.classList.add("hidden")
  unmuteSound.classList.remove("hidden")
})

unmuteSound.addEventListener("click", () => {
  isMuted = true
  setDefaultVolume(0, currentSoundPlayed)
  unmuteSound.classList.add("hidden")
  muteSound.classList.remove("hidden")
})

/**
 * Slide Box
 */
let hasSlide = false

function originalSlide(posY) {
  TweenLite.to(box.group.position, 1, {
    y: -1,
    ease: "Power3.easeInOut"
  })
  hasSlide = false
}

function boxSlide(posY) {
  TweenLite.to(box.group.position, 1, {
    y: -6,
    ease: "Power3.easeInOut"
  })
  hasSlide = true
}

const sounds = document.querySelectorAll(".sound")

sounds.forEach(_sound => {
  _sound.addEventListener("click", () => {
    document.querySelector(".soundActive").classList.remove("soundActive")
    _sound.classList.add("soundActive")
    if (_sound.getAttribute("data-value") == "sound1" && !isMuted) {
      currentSoundPlayed = 1
      stopAllSound()
      playSound1()
      originalSlide()
    } else if (_sound.getAttribute("data-value") == "sound2" && !isMuted) {
      currentSoundPlayed = 2
      stopAllSound()
      playSound2()
      originalSlide()
    } else if (!isMuted) {
      currentSoundPlayed = 3
      stopAllSound()
      playSound3()
      if (hasSlide === false) {
        boxSlide()
      }
    } else if(_sound.getAttribute("data-value") == "sound1" && isMuted){
      currentSoundPlayed = 1
      stopAllSound()
      playSound1()
      originalSlide()
      setDefaultVolume(0, currentSoundPlayed)
    }else if(_sound.getAttribute("data-value") == "sound2" && isMuted){
      currentSoundPlayed = 2
      stopAllSound()
      playSound2()
      originalSlide()
      setDefaultVolume(0, currentSoundPlayed)
    }else if(_sound.getAttribute("data-value") == "sound3" && isMuted){
      currentSoundPlayed = 3
      stopAllSound()
      playSound3()
      boxSlide()
      setDefaultVolume(0, currentSoundPlayed)
    }
  })
})

/**
 * Sound Play/Pause
 */

function stopAllSound() {
  guitarAudioInstance.pause()
  bassAudioInstance.pause()
  pianoAudioInstance.pause()
  drumsAudioInstance.pause()
  drumsPercAudioInstance.pause()
  drumsKickAudioInstance.pause()

  guitarAudio2Instance.pause()
  pianoAudio2Instance.pause()
  bassAudio2Instance.pause()
  drumsAudio2Instance.pause()

  guitarAudio3Instance.pause()
  bassAudio3Instance.pause()
  drumsAudio3Instance.pause()
  drumsKickAudio3Instance.pause()
}

function playSound1() {
  guitarAudioInstance.play()
  bassAudioInstance.play()
  pianoAudioInstance.play()
  drumsAudioInstance.play()
  drumsPercAudioInstance.play()
  drumsKickAudioInstance.play()
}
function playSound2() {
  guitarAudio2Instance.play()
  pianoAudio2Instance.play()
  bassAudio2Instance.play()
  drumsAudio2Instance.play()
  box.group.add(pianoLight)
}
function playSound3() {
  guitarAudio3Instance.play()
  bassAudio3Instance.play()
  drumsAudio3Instance.play()
  drumsKickAudio3Instance.play()
}
/**
 * START
 */
const start = () => {
  setDefaultVolume(0.5)

  playSound1()
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
    z: camera.position.z - 1.6,
    ease: "Power3.easeInOut"
  })
  hasPlayedZoomAnimation = true
  isZooming = true
  if (!isMuted) setDefaultVolume(0.1, currentSoundPlayed)
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
  if (!isMuted) setDefaultVolume(0.5, currentSoundPlayed)
}

//PIANO
let hoverPiano = false
document.addEventListener("click", () => {
  if (isZooming) return
  if (hoverPiano && hasPlayedZoomAnimation === false) {
    instrumentZoom(1.25, 1.25)
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        pianoAudioInstance.volume = 1
      } else if (currentSoundPlayed == 2) {
        pianoAudio2Instance.volume = 1
      }
    }
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
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        guitarAudioInstance.volume = 1
      } else if (currentSoundPlayed == 2) {
        guitarAudio2Instance.volume = 1
        pianoAudio2.volume = 1
      } else {
        guitarAudio3Instance.volume = 1
      }
    }
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
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        drumsAudioInstance.volume = 1
        drumsKickAudioInstance.volume = 1
        drumsPercAudioInstance.volume = 1
      } else if (currentSoundPlayed == 2) {
        drumsAudio2Instance.volume = 1
      } else {
        drumsAudio3Instance.volume = 1
        drumsKickAudio3Instance.volume = 1
      }
    }
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
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        bassAudioInstance.volume = 1
      } else if (currentSoundPlayed == 2) {
        bassAudio2Instance.volume = 1
      } else {
        bassAudio3Instance.volume = 1
      }
    }
  } else if (hoverBass && hasPlayedZoomAnimation === true) {
    originalZoom(-1.25, 1.25, -6)
  }
})

/**Float */

const animation = new TimelineMax()
animation
  .from(boxContent.position, 1, {
    y: boxContent.position.y + 0.03,
    ease: "linear"
  })
  .to(boxContent.position, 1, {
    y: boxContent.position.y - 0.03,
    ease: "linear"
  })
  .to(boxContent.position, 1, {
    y: boxContent.position.y + 0.03,
    ease: "linear"
  })

animation.repeat(-1)

/**
 * Loop
 */
const raycaster = new THREE.Raycaster()

const loop = () => {
  window.requestAnimationFrame(loop)
  cameraControls.update()

  //Add text

  if (boxContent.position.z.toFixed(1) == 4.4) {
    box.group.add(box.pianoText)
    animation.pause()
  } else {
    box.group.remove(box.pianoText)
    animation.resume()
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box4.group.add(box.bassText)
    animation.pause()
  } else {
    box4.group.remove(box.bassText)
    animation.resume()
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box3.group.add(box.drumsText)
    animation.pause()
  } else {
    box3.group.remove(box.drumsText)
    animation.resume()
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box2.group.add(box.guitarText)
    animation.pause()
  } else {
    box2.group.remove(box.guitarText)
    animation.resume()
  }

  // Cursor raycasting
  const raycasterCursor = new THREE.Vector2(cursor.x * 2, -cursor.y * 2)
  raycaster.setFromCamera(raycasterCursor, camera)

  //PIANO
  const intersectsPiano = raycaster.intersectObject(box.group, true)
  if (intersectsPiano.length && hasStarted) {
    hoverPiano = true
  } else {
    hoverPiano = false
  }
  //GUITAR
  const intersectsGuitar = raycaster.intersectObject(box2.group, true)
  if (intersectsGuitar.length && hasStarted) {
    hoverGuitar = true
  } else {
    hoverGuitar = false
  }
  //DRUMS
  const intersectsDrums = raycaster.intersectObject(box3.group, true)
  if (intersectsDrums.length && hasStarted) {
    hoverDrums = true
  } else {
    hoverDrums = false
  }
  //DRUMS
  const intersectsBass = raycaster.intersectObject(box4.group, true)
  if (intersectsBass.length && hasStarted) {
    hoverBass = true
  } else {
    hoverBass = false
  }

  // Render
  renderer.render(scene, camera)
}

loop()

/**
 * MENU / CREDITS / ABOUT
 */
const aboutButton = document.querySelector(".about-button-js")
const creditsButton = document.querySelector(".credits-button-js")
const welcomeModal = document.querySelector(".welcome-modal-js")
const aboutModal = document.querySelector(".about-modal-js")
const creditsModal = document.querySelector(".credits-modal-js")
const closeAboutModal = document.querySelector(".close-about-js")
const closeCreditsModal = document.querySelector(".close-credits-js")
const closeWelcomeModal = document.querySelector(".close-welcome-js")

creditsButton.addEventListener("click", () => {
  openCreditsModalEvent()
})

aboutButton.addEventListener("click", () => {
  openAboutModalEvent()
})

closeWelcomeModal.addEventListener("click", () => {
  hasStarted = true
  closeWelcomeModalEvent()
})

closeAboutModal.addEventListener("click", () => {
  closeAboutModalEvent()
})

closeCreditsModal.addEventListener("click", () => {
  closeCreditsModalEvent()
})

function openAboutModalEvent() {
  hasStarted = false
  if (!isMuted) setDefaultVolume(0.2, currentSoundPlayed)
  aboutModal.style.zIndex = 2
  aboutModal.classList.add("openModal")
}

function openCreditsModalEvent() {
  hasStarted = false
  if (!isMuted) setDefaultVolume(0.2, currentSoundPlayed)
  creditsModal.style.zIndex = 2
  creditsModal.classList.add("openModal")
}

function closeCreditsModalEvent() {
  hasStarted = true
  if (!isMuted) setDefaultVolume(0.5, currentSoundPlayed)
  creditsModal.style.zIndex = -10
  creditsModal.classList.remove("openModal")
  creditsModal.classList.add("closeModal")
}

function closeWelcomeModalEvent() {
  hasStarted = true
  welcomeModal.style.zIndex = -10
  welcomeModal.classList.remove("openModal")
  welcomeModal.classList.add("closeModal")
}

function closeAboutModalEvent() {
  hasStarted = true
  if (!isMuted) setDefaultVolume(0.5, currentSoundPlayed)
  aboutModal.style.zIndex = -10
  aboutModal.classList.remove("openModal")
  aboutModal.classList.add("closeModal")
}

/**
 * Paralax box
 */


window.addEventListener("mousemove", _event => {
  let multipleRatio = 0.4
  if(boxContent.position.z.toFixed(1) == 4.4) multipleRatio = 0.05
  const ratioX = _event.clientX / sizes.width - 0.5
  const ratioY = _event.clientY / sizes.height - 0.5
  const translateX = -ratioX * multipleRatio
  const translateY = -ratioY * multipleRatio
  camera.position.x = translateX
  camera.position.y = translateY
})
