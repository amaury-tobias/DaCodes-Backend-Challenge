#!/usr/bin/env node

const http = require('http')
const debug = require('debug')('server:http')
const app = require('../app')

const port = normalizePort(process.env.PORT || '3000')

app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 *
 * @param {String} inputPort
 * @returns {String|Number|false}
 */
function normalizePort(inputPort) {
  var port = parseInt(inputPort, 10)

  if (isNaN(port)) {
    // named pipe
    return inputPort
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
