const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const request = require('request')

server.listen(8000)

app.get('/', function(req, res) {
  res.send('OK')
})

const CACHE_FREQUENCY = 60 // cache every minute
const CACHE_LENGTH = 184 // store ~2 full orbits worth if ISS data

let updatesSinceCache = 0
const history = []
function poll() {
  request(`http://api.open-notify.org/iss-now.json`, (err, res, body) => {
    if (err) {
      console.error('request error', err.message)
    }

    try {
      const { latitude, longitude } = JSON.parse(body).iss_position

      updatesSinceCache++
      if (updatesSinceCache >= CACHE_FREQUENCY) {
        history.push([latitude, longitude])
        updatesSinceCache = 0
      }

      if (history.length > CACHE_LENGTH) {
        history.shift()
      }

      io.sockets.emit('update', [latitude, longitude])
    } catch (err) {}
  })
}

io.on('connect', socket => {
  socket.emit('history', history)
})

setInterval(poll, 1000)

//TODO use https://github.com/shahar603/SpaceXtract to get live telemetry data and feed via websockets
