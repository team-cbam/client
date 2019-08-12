'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
// const config = require('./../config')

const uploadImage = event => {
  event.preventDefault()
  console.log()
  const formData = new FormData(event.target)
  for (const [key, value] of formData.entries()) {
    console.log(key, value)
  }
}

const onCreateEvent = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  // const formData = new FormData(event.target)
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value)
  // // }
  api.createEvent(formData)
    .then(() => onGetAllEvents())
    .then(ui.createEventSuccess)
    .catch(ui.createEventFailure)
}

const onDeleteEvent = (event) => {
  event.preventDefault()
  const eventId = event.target.dataset.id
  console.log(eventId)
  api.deleteEvent(eventId)
    .then(() => onGetAllEvents())
    .catch(ui.failure)
}

const onGetAllEvents = function (event) {
  api.getAllEvents()
    .then(ui.getEventsSuccess)
    .catch(ui.getEventsSuccessFailure)
}

const onUpdateEvent = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  const id = event.dataset.id
  api.updateEvent(formData, id)
    .then(ui.updateEventSuccess)
    .catch(ui.updateEventSuccessFailure)
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
  if (!thisEvent.rsvps.includes(store.user)) {
    thisEvent.rsvps.push(store.user)
    api.updateEvent({
      event: thisEvent
    })
      .then(ui.onRSVPSuccess)
      .catch(console.error)
  } else {
    $('.status-message').text("You're already attending this event.")
    setTimeout(function () {
      $('.status-message').fadeOut()
    }, 6000)
  }
}

const addHandlers = () => {
  $(document).on('click', '#see-all-events', onGetAllEvents)
  $(document).on('submit', '#create-event', onCreateEvent)
  $(document).on('submit', '#image-input', uploadImage)
  $(document).on('submit', '#update-event', onUpdateEvent)
  $(document).on('click', '#delete-event', onDeleteEvent)
  $(document).on('click', '.delete-event', onDeleteEvent)
  $(document).on('click', '.event-card', onOpenEvent)
  $(document).on('click', '.back-to-events', onGetAllEvents)
  $(document).on('click', '.attending', onRSVP)
  $(document).on('click', '.see-all-rsvp', onMyRSVP)
}

module.exports = {
  onCreateEvent,
  onGetAllEvents,
  onDeleteEvent,
  onUpdateEvent,
  addHandlers
}
