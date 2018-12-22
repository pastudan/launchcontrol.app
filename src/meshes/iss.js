import * as THREE from 'three'
import { degToRad, latToPolar, ISS_ORBIT_RADIUS } from '../util'

const issGeometry = new THREE.SphereGeometry(0.02, 40, 40)
const issMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
export const issMesh = new THREE.Mesh(issGeometry, issMaterial)

const issPathGeometry = new THREE.BufferGeometry()
const issPathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
export const issPathMesh = new THREE.Line(issPathGeometry, issPathMaterial)

const history = []
function updateIss() {
  window
    .fetch('http://api.open-notify.org/iss-now.json')
    .then(res => res.json())
    .then(({ iss_position: { latitude, longitude } }) => {
      issMesh.position.setFromSphericalCoords(
        ISS_ORBIT_RADIUS,
        degToRad(latToPolar(latitude)),
        degToRad(longitude)
      )

      // Update path
      history.push(
        new THREE.Vector3().setFromSphericalCoords(
          ISS_ORBIT_RADIUS,
          degToRad(latToPolar(latitude)),
          degToRad(longitude)
        )
      )
      if (history.length > 500) {
        history.unshift()
      }
      if (history.length > 2) {
        const curve = new THREE.CatmullRomCurve3(history)
        const points = curve.getPoints(500)
        issPathGeometry.setFromPoints(points)
        issPathGeometry.attributes.position.needsUpdate = true
      }
    })
}

window.setInterval(updateIss, 5000)
updateIss()

// TODO load full 3D Model below, but lower vertex count - performance is terrible with current model
// let issMesh
// loader.load(
//   '/iss.glb',

//   function(gltf) {
//     issMesh = gltf.scene.children[0]
//     issMesh.scale.multiplyScalar(0.0005)
//     issMesh.position.setFromSphericalCoords(
//       EARTH_RADIUS + 118 / 1000,
//       degToRad(latToPolar(28.608397)),
//       degToRad(-80.604345)
//     )
//     // issMesh.lookAt(new THREE.Vector3(0, 0, 0))
//     scene.add(issMesh)

//     function updateIss() {
//       window
//         .fetch('http://api.open-notify.org/iss-now.json')
//         .then(res => res.json())
//         .then(({ iss_position: { latitude, longitude } }) =>
//           issMesh.position.setFromSphericalCoords(
//             ISS_RADIUS,
//             degToRad(latToPolar(latitude)),
//             degToRad(longitude)
//           )
//         )
//     }
//     updateIss()
//     window.setInterval(updateIss, 5000)

//     // gltf.animations // Array<THREE.AnimationClip>
//     // gltf.scene // THREE.Scene
//     // gltf.scenes // Array<THREE.Scene>
//     // gltf.cameras // Array<THREE.Camera>
//     // gltf.asset // Object
//   },
//   function(xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//   },
//   function(error) {
//     console.log('An error happened')
//   }
// )
