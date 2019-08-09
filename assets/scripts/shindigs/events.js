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
  $(document).on('click', '#see-all-events', onGetAllEvents)
  $(document).on('submit', '#create-event', onCreateEvents)
  $(document).on('submit', '#update-event', onUpdateEvents)
  $(document).on('click', '.delete-events', onDeleteEvents)
}

module.exports = {
  onCreateEvents,
  onGetAllEvents,
  onDeleteEvents,
  onUpdateEvents,
  addHandlers
}
