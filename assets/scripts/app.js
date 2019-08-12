'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const shindigsEvents = require('./shindigs/events.js')

$(() => {
  shindigsEvents.onGetAllEvents()
  authEvents.addHandlers()
  shindigsEvents.addHandlers()
})
