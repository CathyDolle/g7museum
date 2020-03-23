import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Piano {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load("/models/piano/piano.gltf", _gltf => {
      console.log(_gltf)
      this.piano = _gltf.scene.children[0]
      this.piano.scale.set(0.01, 0.01, 0.01)
      this.group.add(this.piano)
    })
  }
}
