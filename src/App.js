import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as THREE from 'three'
import earthTexture from './img/earth-texture-8k.jpg'

const EARTH_RADIUS = 6371
const SUN_RADIUS = 695508
const GEOSTATIONARY_ALTITUDE = 35786
const SUN_EARTH_DIST = 149600000

class App extends Component {
  state = {
    renderer: null
  }

  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      500000
    )
    camera.position.z = GEOSTATIONARY_ALTITUDE
    // camera.position.y = 15000
    camera.position.x = -200000

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth * 2, window.innerHeight * 2)
    renderer.setClearColor(0x000000, 0.0)
    this.renderContainer.appendChild(renderer.domElement)

    // add Earth
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture(earthTexture)
    })
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earthMesh)

    const moonGlow = new THREE.Mesh(sphereGeom.clone(), customMaterial.clone())
    moonGlow.position = moon.position
    moonGlow.scale.multiplyScalar(1.2)
    scene.add(moonGlow)

    //
    const ambLight = new THREE.AmbientLight(0xaaaaaa)
    scene.add(ambLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    scene.add(dirLight)

    function animate() {
      // cube.rotation.x += 0.01
      earthMesh.rotation.y += 0.002
      dirLight.position.set(
        camera.position.x - 15000,
        camera.position.y + 15000,
        camera.position.z - 15000
      )

      if (camera.position.x < 0) {
        camera.position.x += 1000
        camera.lookAt(0, 0, 0)
      }

      requestAnimationFrame(animate)
      renderer.clear()
      renderer.render(scene, camera)
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
