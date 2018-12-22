import * as THREE from 'three'
import { EARTH_RADIUS } from '../util'

// Equator
const curve = new THREE.EllipseCurve(
  0, // aX
  0, // aY
  EARTH_RADIUS + 0.0001, // xRadius
  EARTH_RADIUS + 0.0001, // yRadius
  0, // aStartAngle,
  2 * Math.PI, // aEndAngle
  false, // aClockwise
  Math.PI / 2 // aRotation
)
const points = curve.getPoints(200)
const geometry = new THREE.BufferGeometry().setFromPoints(points)
const material = new THREE.LineDashedMaterial({
  color: 0xff4444,
  linewidth: 3,
  scale: 1,
  dashSize: 0.1,
  gapSize: 0.07
})
export const equatorMesh = new THREE.Line(geometry, material)
equatorMesh.computeLineDistances()
equatorMesh.rotation.x += Math.PI / 2
