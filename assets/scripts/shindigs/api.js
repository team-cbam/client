'use strict'

const config = require('../config')
const store = require('../store')

const createEvent = formData => {
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value)
  // }
  // console.log(store.user.token)
  console.log(formData)
  return $.ajax({
    url: config.apiUrl + '/events',
    data: formData,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    method: 'POST',
    contentType: false,
    processData: false
  })
}

const updateEvent = (formData) => {
  console.log(formData)
  return $.ajax({
    url: config.apiUrl + '/events/' + formData._id,
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
      Authorization: 'Bearer token=' + store.user.token
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
