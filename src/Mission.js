import React, { Component } from 'react'
import YouTube from 'react-youtube'

import './Mission.css'

const missionTime = 240

class Mission extends Component {
  state = {
    missionSelectorOpen: false,
    missionName: 'Iridium 8',
    phases: [
      { name: 'liftoff', time: 0 },
      { name: 'entry burn', time: 0.3 },
      { name: 'landing', time: 0.85 },
      { name: 'deploy', time: 1 }
    ],
    elapsedTime: 0
  }

  componentDidMount = () => {
    window.setInterval(() => this.setState({ elapsedTime: this.state.elapsedTime + 1 }), 1000)
  }

  render() {
    const { missionName, phases, elapsedTime, selectorOpen } = this.state

    const progressWidth = (elapsedTime / missionTime) * 100 + '%'
    const ytOpts = {
      height: '225',
      width: '400',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
      <div className={`Mission ${selectorOpen ? 'selector-open' : ''}`}>
        <YouTube className="video" videoId="wbSwFU6tY1c" opts={ytOpts} onReady={this._onReady} />
        <div className="current" onClick={() => this.setState({ selectorOpen: !selectorOpen })}>
          <div className="change">change mission</div>
          <h1>{missionName}</h1>
          <div className="skew" />
        </div>
        <div className="selector">
          <h2>2017</h2>
          <ul>
            <li>
              <span>Jan 27</span>Iridium 6
            </li>
            <li>
              <span>Mar 6</span>SES-11
            </li>
          </ul>
          <h2>2018</h2>
          <ul>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Dec 23</span>GPS III-B
            </li>
          </ul>
          <h2>2019</h2>
          <ul>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li className="selected">
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
          </ul>
          <h2>Future</h2>
          <ul>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
            <li>
              <span>Feb 8</span>Iridium 8
            </li>
          </ul>
        </div>
        <div className="progress">
          <div className="bar">
            <div className="bar-complete" style={{ width: progressWidth }} />
            <div className="phases">
              {phases.map(({ name, time }, index) => (
                <div
                  key={name}
                  phase={name}
                  className={`phase ${index % 2 === 0 ? 'top' : 'bottom'} ${
                    elapsedTime / missionTime > time ? 'complete' : 'pending'
                  }`}
                  style={{ left: `${time * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Mission
