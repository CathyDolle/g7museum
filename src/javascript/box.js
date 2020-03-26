import * as THREE from "three"


import {
  GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader.js"
import {
  DRACOLoader
} from "three/examples/jsm/loaders/DRACOLoader.js"

import pianoTextSource from './../images/texturePiano.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const pianoTextTexture = textureLoader.load(pianoTextSource)


export default class Box {
  constructor() {
    
    this.group = new THREE.Group()

    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff})

    const boxBottom = new THREE.BoxGeometry(2, 0.1, 2)
    const boxBottomMesh = new THREE.Mesh(boxBottom, boxMaterial)

    const pianoText = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.1, 2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, map: pianoTextTexture })
    )

    pianoText.rotateZ(Math.PI*0.5)
    pianoText.position.set(-1.05,0.95,0)

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
    

    const planMaterial = new THREE.MeshBasicMaterial({color:0xd6d4d4, })
    
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

  

  

    
    this.group.add(boxBottomMesh, boxTopMesh, boxLeftMesh, boxRightMesh, boxBackMesh, planBottomMesh, planLeftMesh, planRightMesh, planTopMesh, smallPlanTopMesh, smallPlanBottomMesh, smallPlanLeftMesh, smallPlanRightMesh, pianoText)
    
    }
}