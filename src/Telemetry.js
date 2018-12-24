import React, { Component } from 'react'
import './Telemetry.css'

class Telemetry extends Component {
  state = {
    launchDate: new Date('2019-01-07T07:53Z') // Iridium 8 - hardcoded for now
  }

  componentDidMount = () => {
    window.setInterval(() => this.forceUpdate(), 1000)
  }

  render() {
    const { launchDate } = this.state

    let timeRemaining = new Date() - launchDate

    const sign = timeRemaining > 0 ? '+' : '-'
    timeRemaining = Math.abs(timeRemaining / 1000)

    let days = Math.floor(timeRemaining / 86400)
    days = days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : ''

    timeRemaining = timeRemaining % 86400

    const hours = Math.floor(timeRemaining / 3600)
      .toString()
      .padStart(2, '0')
    timeRemaining = timeRemaining % 3600

    const minutes = Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, '0')
    timeRemaining = timeRemaining % 60

    const seconds = Math.floor(timeRemaining)
      .toString()
      .padStart(2, '0')

    return (
      <div className="Telemetry">
        <div className="sign">
          <div className="skew">
            <span>T{sign}</span>
          </div>
        </div>
        <div className="time">
          {days}
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    )
  }
}

export default Telemetry
