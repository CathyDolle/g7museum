import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Box {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load("/models/box/box.gltf", _gltf => {
      this.box = _gltf.scene.children[0]
      this.box.scale.set(1, 1, 1)
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
  }
}
