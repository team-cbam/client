const showEventsTemplate = require('../templates/handlebars/event-listing.handlebars')
const openedEvent = require('../templates/handlebars/event-page.handlebars')
const ownerButtons = require('../templates/owner-buttons.handlebars')
const store = require('../store')

const getEventsSuccess = (data) => {
  const showEventsHtml = showEventsTemplate({ events: data.events })
  $('.content').html(showEventsHtml)
  $('form').trigger('reset')
}

const getEventsFailure = function (error) {
  $('#message').text('Error on getting events')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not get any events', error)
}

const openEventSuccess = data => {
  const openEventHTML = openedEvent({ event: data.event })
  $('.content').html(openEventHTML)
  if (store.user && data.event.owner === store.user._id) {
    const ownerButtonsHTML = ownerButtons({ event: data.event, editable: true })
    $('.content').append(ownerButtonsHTML)
  }
}

const clearEvents = () => {
  $('.content').empty()
  $('#message').text('Cleared all the events!')
}

const createEventSuccess = () => {
  $('#message').text('Yay! You created a new event!')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const createEventFailure = function (error) {
  $('#message').text('Error on creating a event')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not create any events', error)
}

const showEventsSuccess = () => {
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const showEventsFailure = function (error) {
  $('#message').text('Error on creating a event')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not create any events', error)
}

const updateEventsSuccess = () => {
  $('#message').text('Yay! You changed a event!')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const updateEventsFailure = function (error) {
  $('#message').text('Error on creating a event')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not create any events', error)
}

const deleteEventsFailure = function (error) {
  $('#message').text('Error on deleting a event')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not delete any events', error)
}

const failure = (error) => {
  $('.status-message').text('An Error Occurred').css('color', 'red')
  console.error(error)
}

module.exports = {
  clearEvents,
  failure,
  getEventsSuccess,
  getEventsFailure,
  createEventSuccess,
  createEventFailure,
  deleteEventsFailure,
  updateEventsSuccess,
  updateEventsFailure,
  showEventsSuccess,
  showEventsFailure,
  openEventSuccess
}
