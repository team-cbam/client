'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
// const config = require('./../config')

const onCreateEvents = event => {
  event.preventDefault()
  // const formData = getFormFields(form)
  const formData = new FormData(event.target)
  api.createEvents(formData)
    .then(ui.createEventsSuccess)
    .catch(ui.createEventsFailure)
}

const onDeleteEvents = (event) => {
  event.preventDefault()
  const eventId = $(event.target).data('id')
  api.deleteEvents(eventId)
    .then(() => onGetAllEvents(event))
    .catch(ui.failure)
}

const onGetAllEvents = function (event) {
  api.getEvents()
    .then(ui.getEventsSuccess)
    .catch(ui.getEventsSuccessFailure)
}

const onUpdateEvents = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.updateEventsSuccess(formData)
    .then(ui.updateEventsSuccess)
    .catch(ui.updateEventsSuccessFailure)
}

const addHandlers = () => {
  $('#getEventsButton').on('submit ')
  $('#getEventsButton').on('click', onGetAllEvents)
  $('body').on('submit', '#create-event', onCreateEvents)
  $('body').on('submit', '#update-event', onUpdateEvents)
  $('body').on('click', '.delete-events', onDeleteEvents)
  // const display = function(data) {
  //   console.log(data)
  //   //   $('#display').html(`<img src="${data.ImageUpload.url}/>`)
  //   // }
}

module.exports = {
  onCreateEvents,
  onGetAllEvents,
  onDeleteEvents,
  onUpdateEvents,
  addHandlers
}
