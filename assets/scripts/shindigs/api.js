'use strict'

const config = require('../config')
const store = require('../store')

const createEvent = formData => {
  // for (const [key, value] of formData.entries()) {
  return $.ajax({
    url: config.apiUrl + '/events',
    data: {event: formData},
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    method: 'POST'
  })
}

const updateEvent = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/events/' + formData.event._id,
    method: 'PATCH',
    data: formData
  })
}

const getAllEvents = function () {
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
      Authorization: 'Bearer ' + store.user.token
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
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  openEvent
}
