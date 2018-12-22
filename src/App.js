import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as THREE from 'three'
import earthTexture from './img/earth-texture-8k.jpg'
import OrbitControlsPackage from 'three-orbit-controls'
import GLTFLoader from 'three-gltf-loader'
import { isS } from 'xmlchars/xml/1.0/ed5'

const OrbitControls = OrbitControlsPackage(THREE)

const EARTH_RADIUS = 6371 / 1000
const SUN_RADIUS = 695508 / 1000
const GEOSTATIONARY_RADIUS = 42164 / 1000
const SUN_EARTH_DIST = 149600000 / 1000
const ISS_RADIUS = EARTH_RADIUS + 408 / 1000

function degToRad(deg) {
  return (deg / 180) * Math.PI
}

function latToPolar(lat) {
  return 90 - lat
}

class App extends Component {
  state = {
    renderer: null
  }

  componentDidMount() {
    // Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      500000
    )
    camera.position.setFromSphericalCoords(
      GEOSTATIONARY_RADIUS,

      degToRad(latToPolar(0)),
      degToRad(-122.4049877)
    )
    // camera.position.y = 15000
    // camera.position.x = -200000
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth * 2, window.innerHeight * 2)
    renderer.setClearColor(0x99c3e2)
    this.renderContainer.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera)
    controls.enableDamping = true
    controls.rotateSpeed = 0.4
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.25
    controls.dampingFactor = 0.35
    controls.enablePan = false
    controls.maxDistance = GEOSTATIONARY_RADIUS * 2
    controls.minDistance = GEOSTATIONARY_RADIUS / 2
    function resizeCanvas() {
      renderer.setSize(window.innerWidth * 2, window.innerHeight * 2)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resizeCanvas, false)
    document.body.addEventListener('touchmove', function(e) {
      e.preventDefault()
    })

    // Earth
    const texture = THREE.ImageUtils.loadTexture(earthTexture)
    texture.offset = new THREE.Vector2(0.25, 0)
    texture.wrapS = THREE.RepeatWrapping
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: texture
    })
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earthMesh)

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
    const curveObject = new THREE.Line(geometry, material)
    curveObject.computeLineDistances()
    curveObject.rotation.x += Math.PI / 2
    scene.add(curveObject)

    // ISS
    const issGeometry = new THREE.SphereGeometry(0.2, 40, 40)
    const issMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
    const issMesh = new THREE.Mesh(issGeometry, issMaterial)
    scene.add(issMesh)
    function updateIss() {
      window
        .fetch('http://api.open-notify.org/iss-now.json')
        .then(res => res.json())
        .then(({ iss_position: { latitude, longitude } }) =>
          issMesh.position.setFromSphericalCoords(
            ISS_RADIUS,
            degToRad(latToPolar(latitude)),
            degToRad(longitude)
          )
        )
    }
    updateIss()
    window.setInterval(updateIss, 5000)

    // Falcon Heavy
    const loader = new GLTFLoader()
    let fhMesh
    loader.load(
      '/falcon-heavy.glb',

      function(gltf) {
        fhMesh = gltf.scene.children[0]
        fhMesh.scale.multiplyScalar(0.01)
        fhMesh.position.setFromSphericalCoords(
          EARTH_RADIUS + 118 / 1000,
          degToRad(latToPolar(28.608397)),
          degToRad(-80.604345)
        )
        fhMesh.lookAt(new THREE.Vector3(0, 0, 0))
        fhMesh.rotation.y = fhMesh.rotation.y + Math.PI
        fhMesh.rotation.z = fhMesh.rotation.z + 1.72 * Math.PI
        scene.add(fhMesh)

        // gltf.animations // Array<THREE.AnimationClip>
        // gltf.scene // THREE.Scene
        // gltf.scenes // Array<THREE.Scene>
        // gltf.cameras // Array<THREE.Camera>
        // gltf.asset // Object
      },
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      function(error) {
        console.log('An error happened')
      }
    )

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

    // Earth glow from http://stemkoski.github.io/Three.js/Shader-Glow.html
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.4 },
        p: { type: 'f', value: 6 },
        glowColor: { type: 'c', value: new THREE.Color(0xd4ffed) },
        viewVector: { type: 'v3', value: camera.position }
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
    const earthGlow = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS * 1.2, 64, 64),
      customMaterial.clone()
    )
    scene.add(earthGlow)

    // Lighting
    const ambLight = new THREE.AmbientLight(0xaaaaaa)
    scene.add(ambLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    scene.add(dirLight)

    function animate() {
      // earthMesh.rotation.y += 0.002

      if (fhMesh) {
        const dist = Math.sqrt(
          camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2
        )

        const scale = dist ** 0.9 / (controls.maxDistance - controls.minDistance) / 60
        fhMesh.scale.set(scale, scale, scale)
      }

      controls.update()
      const phi = controls.getAzimuthalAngle()
      const theta = controls.getPolarAngle()
      dirLight.position.setFromSphericalCoords(GEOSTATIONARY_RADIUS, theta - 0.5, phi - 0.5)
      earthGlow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
        camera.position,
        earthGlow.position
      )
      renderer.clear()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
  }

  render() {
    return (
      <div className="App">
        <div className="render-container" ref={node => (this.renderContainer = node)} />
      </div>
    )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
