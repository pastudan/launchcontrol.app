import GLTFLoader from 'three-gltf-loader'
import { degToRad, latToPolar, EARTH_RADIUS } from '../util'

import { scene } from '../setup'

// Falcon Heavy
const loader = new GLTFLoader()

export let fhMesh
loader.load(
  'falcon-heavy.glb',

  function(gltf) {
    fhMesh = gltf.scene.children[0]
    fhMesh.scale.multiplyScalar(0.01)
    fhMesh.position.setFromSphericalCoords(
      EARTH_RADIUS + 118 / 1000,
      degToRad(latToPolar(28.608397)),
      degToRad(-80.604345)
    )

    fhMesh.lookAt(0, 0, 0)
    fhMesh.rotation.y += Math.PI
    fhMesh.rotation.z += 1.72 * Math.PI

    // fhMesh.position.x -= 1

    // TODO - increase brightness of FH model
    // clues as to how: https://github.com/mrdoob/three.js/issues/12554
    // these work, but leave the earth looking washed out:
    // renderer.gammaFactor = 2.2
    // renderer.gammaOutput = true
    scene.add(fhMesh)
  },
  function(xhr) {
    // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  function(error) {
    console.log('An error happened')
  }
)
