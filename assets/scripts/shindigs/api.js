'use strict'

const config = require('../config')
const store = require('../store')

const uploadImage = formData => {
  return $.ajax({
    method: 'POST',
    data: formData,
    url: config.apiUrl + '/image-uploads',
    contentType: false,
    processData: false
  })
}

const updateImage = imageURL => {
  return $.ajax({
    method: 'PATCH',
    data: {
      event: {
        image: imageURL
      }
    },
    url: config.apiUrl + '/events/' + store.current_event._id
  })
}

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

const updateEvents = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/events/' + store.event_id,
    method: 'PATCH',
    data: {
      event: formData
    }
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
  openEvent,
  uploadImage,
  updateImage
}
