import * as THREE from 'three'
import OrbitControlsPackage from 'three-orbit-controls'
import { degToRad, latToPolar, GEOSTATIONARY_RADIUS } from './util'

import { fhMesh } from './meshes/falcon-heavy'
import { earthMesh, earthGlowMesh } from './meshes/earth'
import { issMesh, issPathMesh } from './meshes/iss'
import { equatorMesh } from './meshes/equator'

// Setup
const OrbitControls = OrbitControlsPackage(THREE)
export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
  20, // FOV
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near Field
  500000 // Far Field
)

camera.position.setFromSphericalCoords(GEOSTATIONARY_RADIUS, degToRad(latToPolar(0)), degToRad(0))

export const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true
})
renderer.gammaInput = true
renderer.gammaOutput = true
renderer.setSize(window.innerWidth * 2, window.innerHeight * 2)

renderer.setClearColor(0x99c3e2)
export const controls = new OrbitControls(camera)
controls.enableDamping = true
controls.rotateSpeed = 0.4
controls.autoRotate = true
controls.autoRotateSpeed = 0.0025
controls.dampingFactor = 0.05
controls.enablePan = false
controls.maxDistance = GEOSTATIONARY_RADIUS * 2
controls.minDistance = GEOSTATIONARY_RADIUS / 2
controls.enableZoom = false
window.addEventListener('mousedown', () => (controls.dampingFactor = 0.4))
window.addEventListener('mouseup', () => (controls.dampingFactor = 0.05))
window.addEventListener('wheel', function(event) {
  const offCanvas = event.target.tagName !== 'CANVAS'
  const offVoidSpace = !event.target.className.split(' ').includes('Mission')
  if (offCanvas && offVoidSpace) {
    return
  }

  const phi = controls.getAzimuthalAngle()
  const theta = controls.getPolarAngle()

  const delta = event.deltaY
  const dist = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2)
  camera.position.setFromSphericalCoords(dist + delta / 10, theta, phi)
  controls.update()
})

// For fixing aspect ratio after resizing
function resizeCanvas() {
  renderer.setSize(window.innerWidth * 2, window.innerHeight * 2)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
window.addEventListener('resize', resizeCanvas, false)

// For removing iOS Safari "rubber-banding"
document.body.addEventListener('touchmove', function(e) {
  e.preventDefault()
})

// Lighting
const ambLight = new THREE.AmbientLight(0xaaaaaa)
// const ambLight = new THREE.AmbientLight(0x454545)
scene.add(ambLight)
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(dirLight)

// Add meshes
scene.add(earthMesh)
scene.add(earthGlowMesh)
scene.add(issMesh)
scene.add(issPathMesh)
scene.add(equatorMesh)

function animate() {
  controls.update()
  const phi = controls.getAzimuthalAngle()
  const theta = controls.getPolarAngle()

  if (fhMesh) {
    const dist = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2)
    const scale = dist ** 0.9 / (controls.maxDistance - controls.minDistance) / 60
    fhMesh.scale.set(scale, scale, scale)
  }

  dirLight.position.setFromSphericalCoords(GEOSTATIONARY_RADIUS, theta - 0.5, phi - 0.5)
  earthGlowMesh.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
    camera.position,
    earthGlowMesh.position
  )

  renderer.clear()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
