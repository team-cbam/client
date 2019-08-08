'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onCreateEvents = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createEvents(formData)
    .then(ui.createEventsSuccess)
    .catch(ui.createEventsFailure)
}

const onDeleteEvents = (event) => {
  event.preventDefault()
  const eventId = $(event.target).data('id')
  api.deleteEvents(eventId)
    .then(() => onGetEvents(event))
    .catch(ui.failure)
}

const onGetEvents = function (event) {
  event.preventDefault()
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
  $('#getEventsButton').on('click', onGetEvents)
  $('body').on('submit', '#create-event', onCreateEvents)
  $('body').on('submit', '#update-event', onUpdateEvents)
  $('body').on('click', '.delete-events', onDeleteEvents)
}

module.exports = {
  onCreateEvents,
  onGetEvents,
  onDeleteEvents,
  onUpdateEvents,
  addHandlers
}
