import * as THREE from 'three'
import earthTexture from '../img/earth-texture-8k.jpg'
import { EARTH_RADIUS } from '../util'

// Earth
const texture = new THREE.TextureLoader().load(earthTexture)
texture.offset = new THREE.Vector2(0.25, 0)
texture.wrapS = THREE.RepeatWrapping
const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64)
const earthMaterial = new THREE.MeshPhongMaterial({
  map: texture
})
export const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)

// Earth glow - derived from http://stemkoski.github.io/Three.js/Shader-Glow.html
const customMaterial = new THREE.ShaderMaterial({
  uniforms: {
    c: { type: 'f', value: 0.4 },
    p: { type: 'f', value: 6 },
    glowColor: { type: 'c', value: new THREE.Color(0xd4ffed) },
    viewVector: { type: 'v3', value: 0 }
  },
  vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main()
        {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
  fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main()
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
})
export const earthGlowMesh = new THREE.Mesh(
  new THREE.SphereGeometry(EARTH_RADIUS * 1.2, 64, 64),
  customMaterial.clone()
)
