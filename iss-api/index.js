const request = require('request')
const io = require('socket.io')(8000)

const history = []
function poll() {
  request(`http://api.open-notify.org/iss-now.json`, (err, res, body) => {
    if (err) {
      console.error('request error', err.message)
    }

    try {
      const { latitude, longitude } = JSON.parse(body).iss_position
      history.push([latitude, longitude])
      if (history.length > 20000) {
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
