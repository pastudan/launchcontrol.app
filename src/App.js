import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import * as THREE from 'three'

class App extends Component {
  state = {
    renderer: null
  }

  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth * 2, window.innerHeight * 2)
    this.renderContainer.appendChild(renderer.domElement)

    this.setState({ renderer: renderer.domElement })

    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial()
    // const cube = new THREE.Mesh(geometry, material)
    // scene.add(cube)

    var geometry = new THREE.SphereGeometry(1, 32, 32)
    var material = new THREE.MeshPhongMaterial()
    var earthMesh = new THREE.Mesh(geometry, material)
    scene.add(earthMesh)

    camera.position.z = 5

    function animate() {
      // cube.rotation.x += 0.01
      earthMesh.rotation.y += 0.01
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }

  render() {
    const { renderer } = this.state
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
