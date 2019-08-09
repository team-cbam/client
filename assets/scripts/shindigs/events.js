'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const config = require('./../config')

const onCreateEvents = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createEvents(formData)
    .then(function (event) {
      event.preventDefault()
      console.log('event', event)
      const imageData = new FormData(event.target)
      console.log(imageData)
      for (const [key, value] of imageData.entries()) {
        console.log(key, value)
      }
      $.ajax({
        url: config.apiUrl + '/image-uploads',
        data: imageData,
        type: 'POST',
        contentType: false,
        processData: false

          // }).then(display)
          .then(console.error)
      })
    })
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
