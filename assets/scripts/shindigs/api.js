'use strict'

const config = require('../config')
const store = require('../store')

const createEvents = formData => {
  return $.ajax({
    url: config.apiUrl + '/events',
    data: formData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    method: 'POST'
  })
}

const updateEvents = (formData) => {
  const updated = formData.event
  console.log(formData)
  return $.ajax({
    url: config.apiUrl + '/events/' + updated._id,
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
