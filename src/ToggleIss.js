import React, { Component } from 'react'
import './ToggleIss.css'

import { issMesh, issPathMesh } from './meshes/iss'
import { scene } from './setup'

class ToggleIss extends Component {
  state = {
    tracking: true
  }

  toggleIss = () => {
    const { tracking } = this.state

    if (tracking) {
      scene.remove(issMesh)
      scene.remove(issPathMesh)
    } else {
      scene.add(issMesh)
      scene.add(issPathMesh)
    }

    this.setState({ tracking: !tracking })
  }

  render() {
    const { tracking } = this.state

    return (
      <div className={`ToggleIss ${tracking ? 'tracking' : ''}`} onClick={() => this.toggleIss()}>
        Track ISS
      </div>
    )
  }
}

export default ToggleIss
