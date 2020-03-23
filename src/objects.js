import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import grassColorSource from './images/house/grass/color.jpg'
import doorColorSource from './images/house/door/color.jpg'
import doorAmbientOcclusionSource from './images/house/door/ambientOcclusion.jpg'
import doorHeightSource from './images/house/door/height.png'
import doorMetalnessSource from './images/house/door/metalness.jpg'
import doorNormalSource from './images/house/door/normal.jpg'
import doorAlphaSource from './images/house/door/alpha.jpg'
import doorRoughnessSource from './images/house/door/roughness.jpg'
import matcapSource from './images/matcaps/1.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColorSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionSource)
const doorHeightTexture = textureLoader.load(doorHeightSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessSource)
const doorNormalTexture = textureLoader.load(doorNormalSource)
const doorAlphaTexture = textureLoader.load(doorAlphaSource)
const doorRoughnessTexture = textureLoader.load(doorRoughnessSource)
const matcapTexture = textureLoader.load(matcapSource)

const grassColorTexture = textureLoader.load(grassColorSource)
grassColorTexture.repeat.x = 2
grassColorTexture.repeat.y = 2
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
// grassColorTexture.rotation = Math.PI * 0.25
// grassColorTexture.center.x = 0.5
// grassColorTexture.center.y = 0.5
grassColorTexture.magFilter = THREE.NearestFilter
grassColorTexture.minFilter = THREE.NearestFilter

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

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 20)
camera.position.z = 8
scene.add(camera)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.x = 7
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 1, 10)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 5, 5)
rectAreaLight.position.set(5, - 3, 5)
rectAreaLight.lookAt(scene.position)
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x00ff9c, 1, 0, Math.PI * 0.2, 0.5)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

spotLight.target.position.z = - 2
spotLight.target.position.x = - 4
spotLight.target.updateMatrixWorld()
scene.add(spotLight.target)

// Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
scene.add(hemisphereLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

/**
 * Objects
 */
const objectsGroup = new THREE.Group()
scene.add(objectsGroup)


// Material
// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture,
//     alphaMap: doorAlphaTexture,
//     transparent: true,
//     opacity: 0.8,
//     color: 0xaaffaa,
//     wireframe: true,
//     side: THREE.DoubleSide
// })
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture
// })
// const material = new THREE.MeshLambertMaterial({
//     color: 0xffffff
// })
// const material = new THREE.MeshPhongMaterial({
//     color: 0xffffff,
//     shininess: 100,
//     specular: 0x1188ff
// })
// const material = new THREE.MeshStandardMaterial({
//     map: doorColorTexture,
//     aoMap: doorAmbientOcclusionTexture,
//     displacementMap: doorHeightTexture,
//     displacementScale: 0.2,
//     metalnessMap: doorMetalnessTexture,
//     roughnessMap: doorRoughnessTexture,
//     normalMap: doorNormalTexture,
//     alphaMap: doorAlphaTexture,
//     transparent: true,
//     side: THREE.DoubleSide
// })
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.3
})

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
objectsGroup.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 40, 40), material)
objectsGroup.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
objectsGroup.add(torusKnot)

// Floor
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20, 1, 1), material)
floor.position.y = - 3
floor.rotation.x -= Math.PI * 0.5
objectsGroup.add(floor)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

/**
 * Shadows
 */
renderer.shadowMap.enabled = true

sphere.castShadow = true
sphere.receiveShadow = true

plane.castShadow = true
plane.receiveShadow = true

torusKnot.castShadow = true
torusKnot.receiveShadow = true

floor.castShadow = false
floor.receiveShadow = true

directionalLight.castShadow = true
pointLight.castShadow = true
spotLight.castShadow = true

/**
 * Camera Controls
 */
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update objects
    sphere.rotation.y += 0.002
    plane.rotation.y += 0.002
    torusKnot.rotation.y += 0.002

    // Camera
    // camera.position.y = - cursor.y * 5
    // camera.position.x = cursor.x * 5

    // const angle = cursor.x * Math.PI * 2
    // camera.position.x = Math.cos(angle) * 3
    // camera.position.z = Math.sin(angle) * 3
    // camera.position.y = cursor.y * 5

    // camera.lookAt(scene.position)

    // Camera controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()