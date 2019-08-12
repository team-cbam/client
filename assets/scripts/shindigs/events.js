'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
// const config = require('./../config')

const onUploadImage = event => {
  event.preventDefault()
  const formData = new FormData(event.target)
  api.uploadImage(formData)
    .then((res) => {
      api.updateImage(res.imageUpload.url)
      return res
    })
    .then(() => {
      onOpenEvent(event)
    })
    .then(ui.uploadImageSuccess)
    .catch(ui.failure)
}

const onCreateEvent = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  // const formData = new FormData(event.target)
  // for (const [key, value] of formData.entries()) {
  // // }
  api.createEvent(formData)
    .then(() => onGetAllEvents())
    .then(ui.createEventSuccess)
    .catch(ui.createEventFailure)
}

const onDeleteEvent = (event) => {
  event.preventDefault()
  const eventId = event.target.dataset.id
  api.deleteEvent(eventId)
    .then(() => onGetAllEvents())
    .then(ui.deleteEventSuccess)
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
  api.updateEvent(formData)
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
  if (!thisEvent.rsvps.includes(store.user)) {
    thisEvent.rsvps.push(store.user)
    api.updateEvent({
      event: thisEvent
    })
      .then(ui.onRSVPSuccess)
      .catch(console.error)
  } else {
    $('.status-message').text("You're already attending this event.").show()
    setTimeout(function () {
      $('.status-message').fadeOut()
    }, 6000)
  }
}

const addHandlers = () => {
  $(document).on('click', '#see-all-events', onGetAllEvents)
  $(document).on('submit', '#create-event', onCreateEvent)
  $(document).on('submit', '#upload-image', onUploadImage)
  $(document).on('submit', '#update-event', onUpdateEvent)
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
  onUpdateEvent,
  addHandlers
}
