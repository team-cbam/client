'use strict'

const config = require('../config')
const store = require('../store')

const createEvents = formData => {
  console.log(formData)
  return $.ajax({
    url: config.apiUrl + '/events',
    data: {
      event: formData
    },
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    method: 'POST'
  })
}

const updateEvents = (formData, id) => {
  return $.ajax({
    url: config.apiUrl + '/events/' + id,
    method: 'PATCH',
    data: formData
  })
}

const getEvents = function () {
  return $.ajax({
    url: config.apiUrl + '/events',
    method: 'GET'
  })
}

const deleteEvent = eventId => {
  return $.ajax({
    url: config.apiUrl + '/events/' + eventId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const openEvent = id => {
  store.event_id = id
  return $.ajax({
    url: config.apiUrl + `/events/${id}`
  })
}
module.exports = {
  createEvents,
  getEvents,
  deleteEvent,
  updateEvents,
  openEvent
}
