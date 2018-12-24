import React, { Component } from 'react'
import './Mission.css'

const missionTime = 240

class Mission extends Component {
  state = {
    missionName: 'Iridium 8',
    phases: [{ name: 'foo', time: 0 }, { name: 'bar', time: 0.3 }, { name: 'baz', time: 1 }],
    elapsedTime: 0
  }

  componentDidMount = () => {
    window.setInterval(() => this.setState({ elapsedTime: this.state.elapsedTime + 1 }), 1000)
  }

  render() {
    const { missionName, phases, elapsedTime } = this.state

    const progressWidth = (elapsedTime / missionTime) * 100 + '%'

    return (
      <div className="Mission">
        <div className="name">
          <h1>{missionName}</h1>
          <div className="skew" />
        </div>
        <div className="progress">
          <div className="bar">
            <div className="bar-complete" style={{ width: progressWidth }} />
            <div className="phases">
              {phases.map(({ name, time }, index) => (
                <div
                  className={`phase ${index % 2 === 0 ? 'top' : 'bottom'}`}
                  style={{ left: time * 100 + '%' }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Mission
