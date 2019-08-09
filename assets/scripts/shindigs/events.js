'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onCreateEvent = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createEvents(formData)
    .then(ui.createEventSuccess)
    .catch(ui.createEventFailure)
}

const onDeleteEvent = (event) => {
  event.preventDefault()
  const eventId = event.target.dataset.id
  console.log(eventId)
  api.deleteEvents(eventId)
    .then(() => onGetAllEvents())
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
  api.updateEvents(formData)
    .then(ui.updateEventsSuccess)
    .catch(ui.updateEventsSuccessFailure)
}

const onOpenEvent = event => {
  event.preventDefault()
  api.openEvent(event.target.dataset.id)
    .then(ui.openEventSuccess)
    .catch(ui.failure)
}

const onRSVP = event => {
  const thisEvent = store.current_event
  console.log(thisEvent.rsvps.includes(store.user))
  if (thisEvent.rsvps.includes(store.user)) {
    thisEvent.rsvps.push(store.user)
    api.updateEvents({ event: thisEvent })
      .then(console.log)
      .catch(console.error)
  } else {
    $('.status-message').text("You have already RSVP'd!")
    setTimeout(function () {
      $('.status-message').fadeOut()
    }, 1000)
  }
}

const addHandlers = () => {
  $(document).on('click', '#see-all-events', onGetAllEvents)
  $(document).on('submit', '#create-event', onCreateEvent)
  $(document).on('submit', '#update-event', onUpdateEvents)
  $(document).on('click', '#delete-event', onDeleteEvent)
  $(document).on('click', '.delete-event', onDeleteEvent)
  $(document).on('click', '.event-card', onOpenEvent)
  $(document).on('click', '.back-to-events', onGetAllEvents)
  $(document).on('click', '.attending', onRSVP)
}

module.exports = {
  onCreateEvent,
  onGetAllEvents,
  onDeleteEvent,
  onUpdateEvents,
  addHandlers,
  onOpenEvent
}
