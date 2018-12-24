import React, { Component } from 'react'
import './App.css'
import { renderer } from './setup'
import Telemetry from './Telemetry'
import ToggleIss from './ToggleIss'
import Mission from './Mission'

class App extends Component {
  state = {
    renderer: null
  }

  componentDidMount() {
    // mount the canvas
    this.renderContainer.appendChild(renderer.domElement)
  }

  render() {
    return (
      <div className="App">
        <div className="render-container" ref={node => (this.renderContainer = node)} />
        <div className="controls">
          <ToggleIss />
          <Telemetry />
          <Mission />
        </div>
      </div>
    )
  }
}

export default App
