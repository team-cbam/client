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

const updateEvents = formData => {
  return $.ajax({
    url: config.apiUrl + '/events/' + formData.event.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const getEvents = function () {
  return $.ajax({
    url: config.apiUrl + '/events',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteEvents = eventId => {
  return $.ajax({
    url: config.apiUrl + '/events/' + eventId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createEvents,
  getEvents,
  deleteEvents,
  updateEvents
}
