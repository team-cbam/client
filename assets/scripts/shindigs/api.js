'use strict'

const config = require('../config')
const store = require('../store')

const createEvents = formData => {
  for (const [key, value] of formData.entries()) {
    console.log(key, value)
  }
  // console.log(store.user.token)
  // console.log(formData)
  return $.ajax({
    url: config.apiUrl + '/events',
    data: formData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    method: 'POST',
    contentType: false,
    processData: false
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
