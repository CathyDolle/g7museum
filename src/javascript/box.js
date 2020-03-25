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

    // const dracoLoader = new DRACOLoader()
    // dracoLoader.setDecoderPath("/draco/")

    // const gltfLoader = new GLTFLoader()
    // gltfLoader.setDRACOLoader(dracoLoader)
    // gltfLoader.load("./models/box/box.gltf", _gltf => {
    //   this.box = _gltf.scene.children[0]
    //   this.box.scale.set(2, 2, 2)
    //   this.box.material = new THREE.MeshStandardMaterial({
    //     color: 0xffffff,
    //     metalness: 0.3,
    //     roughness: 0.8
    //   })
    //   this.box.material.side = THREE.DoubleSide
    //   this.box.castShadow = false
    //   this.box.receive = true
    //   this.group.add(this.box)
    // })
    // gltfLoader.load("./models/box/box.gltf", _gltf => {
    //   this.box2 = _gltf.scene.children[0]
    //   this.box2.scale.set(2, 2, 2)
    //   this.box2.position.set(0,4.50,0)
    //   this.box2.material = new THREE.MeshStandardMaterial({
    //     color: 0xffffff,
    //     metalness: 0.3,
    //     roughness: 0.8
    //   })
    //   this.box2.material.side = THREE.DoubleSide
    //   this.box2.castShadow = false
    //   this.box2.receive = true
    //   this.group.add(this.box2)
    // })
    // gltfLoader.load("./models/box/box.gltf", _gltf => {
    //   this.box3 = _gltf.scene.children[0]
    //   this.box3.scale.set(2, 2, 2)
    //   this.box3.position.set(0,-4.50,0)
    //   this.box3.material = new THREE.MeshStandardMaterial({
    //     color: 0xffffff,
    //     metalness: 0.3,
    //     roughness: 0.8
    //   })
    //   this.box3.material.side = THREE.DoubleSide
    //   this.box3.castShadow = false
    //   this.box3.receive = true
    //   this.group.add(this.box3)
    // })
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff})

    const boxBottom = new THREE.BoxGeometry(2, 0.1, 2)
    const boxBottomMesh = new THREE.Mesh(boxBottom, boxMaterial)

    const boxLeft = new THREE.BoxGeometry(2, 0.1, 2)
    const boxLeftMesh = new THREE.Mesh(boxLeft, boxMaterial)



    const boxTop = new THREE.BoxGeometry(2, 0.1, 2)
    const boxTopMesh = new THREE.Mesh(boxTop, boxMaterial)
    boxTopMesh.position.set(-0.1,2,0)


    boxLeftMesh.rotateZ(Math.PI*0.5)
    boxLeftMesh.position.set(-1.05,0.95,0)
    

    const boxRight = new THREE.BoxGeometry(2, 0.1, 2)
    const boxRightMesh = new THREE.Mesh(boxRight, boxMaterial)
    boxRightMesh.rotateZ(Math.PI*0.5)
    boxRightMesh.position.set(0.95,1.05,0)


    const boxBack = new THREE.BoxGeometry(1.90, 0.1, 1.90)
    const boxBackMesh = new THREE.Mesh(boxBack, boxMaterial)
    boxBackMesh.rotateX(Math.PI*0.5)
    boxBackMesh.position.set(-0.05,1,-0.95)
    

    const planMaterial = new THREE.MeshBasicMaterial({color:0xf5f5f5, })
    
    const planBottom = new THREE.PlaneGeometry(2.1,2,2)
    const planBottomMesh = new THREE.Mesh(planBottom, planMaterial)
    planBottomMesh.position.set(-0.05,-0.0501,0)

    planBottomMesh.rotateX(Math.PI*0.5)

    
    const planLeft = new THREE.PlaneGeometry(2,2.1,2)
    const planLeftMesh = new THREE.Mesh(planLeft, planMaterial)
    planLeftMesh.rotateY(-Math.PI*0.5)
    planLeftMesh.position.set(-1.1001,1,0)

    const planRight = new THREE.PlaneGeometry(2,2.1,2)
    const planRightMesh = new THREE.Mesh(planRight, planMaterial)
    planRightMesh.rotateY(Math.PI*0.5)
    planRightMesh.position.set(1.0001,1,0)
  
    
    const planTop = new THREE.PlaneGeometry(2.1,2,2)
    const planTopMesh = new THREE.Mesh(planTop, planMaterial)
    planTopMesh.position.set(-0.05,2.0501,0)

    planTopMesh.rotateX(-Math.PI*0.5)


    const smallPlanMaterial = new THREE.MeshBasicMaterial({color:0xf5f5f5, })
    const smallPlanTop = new THREE.PlaneGeometry(2.1,0.1,2)
    const smallPlanTopMesh = new THREE.Mesh(smallPlanTop, smallPlanMaterial)
    smallPlanTopMesh.position.set(-0.05,2,1.0001)

    const smallPlanBottom = new THREE.PlaneGeometry(2.1,0.1,2)
    const smallPlanBottomMesh = new THREE.Mesh(smallPlanBottom, smallPlanMaterial)
    smallPlanBottomMesh.position.set(-0.05,0,1.0001)

    const smallPlanLeft = new THREE.PlaneGeometry(2,0.1,2)
    const smallPlanLeftMesh = new THREE.Mesh(smallPlanLeft, smallPlanMaterial)
    smallPlanLeftMesh.position.set(-1.05,1,1.0001)
    smallPlanLeftMesh.rotateZ(Math.PI*0.5)

    const smallPlanRight = new THREE.PlaneGeometry(2,0.1,2)
    const smallPlanRightMesh = new THREE.Mesh(smallPlanRight, smallPlanMaterial)
    smallPlanRightMesh.position.set(0.95,1,1.0001)
    smallPlanRightMesh.rotateZ(Math.PI*0.5)

  

  

    
    this.group.add(boxBottomMesh, boxTopMesh, boxLeftMesh, boxRightMesh, boxBackMesh, planBottomMesh, planLeftMesh, planRightMesh, planTopMesh, smallPlanTopMesh, smallPlanBottomMesh, smallPlanLeftMesh, smallPlanRightMesh)
    
    }
}