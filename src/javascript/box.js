import * as THREE from "three"
import {
  GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader.js"
import {
  DRACOLoader
} from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Box {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load("/models/box/box.gltf", _gltf => {
      this.box = _gltf.scene.children[0]
      this.box.scale.set(2, 2, 2)
      this.box.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.8
      })
      this.box.material.side = THREE.DoubleSide
      this.box.castShadow = false
      this.box.receive = true
      this.group.add(this.box)
    })
    gltfLoader.load("/models/box/box.gltf", _gltf => {
      this.box2 = _gltf.scene.children[0]
      this.box2.scale.set(2, 2, 2)
      this.box2.position.set(0,4.50,0)
      this.box2.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.8
      })
      this.box2.material.side = THREE.DoubleSide
      this.box2.castShadow = false
      this.box2.receive = true
      this.group.add(this.box2)
    })
    gltfLoader.load("/models/box/box.gltf", _gltf => {
      this.box3 = _gltf.scene.children[0]
      this.box3.scale.set(2, 2, 2)
      this.box3.position.set(0,-4.50,0)
      this.box3.material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.8
      })
      this.box3.material.side = THREE.DoubleSide
      this.box3.castShadow = false
      this.box3.receive = true
      this.group.add(this.box3)
    })
  }
}