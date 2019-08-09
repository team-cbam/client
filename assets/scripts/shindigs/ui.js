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
  $('.status-message').text('Error on getting events')
  $('.status-message').removeClass()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not get any events', error)
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 1000)
}

const openEventSuccess = data => {
  store.current_event = data.event
  const openEventHTML = openedEvent({ event: data.event, user: store.user })
  $('.content').html(openEventHTML)
  if (store.user && data.event.owner === store.user._id) {
    const ownerButtonsHTML = ownerButtons({ event: data.event, editable: true })
    $('.content').append(ownerButtonsHTML)
  }
}

const clearEvents = () => {
  $('.content').empty()
  $('.status-message').text('Cleared all the events!')
}

const createEventSuccess = () => {
  $('.status-message').text('Yay! You created a new event!')
  $('.status-message').removeClass()
  $('.status-message').addClass('success')
  $('form').trigger('reset')
}

const createEventFailure = function (error) {
  $('.status-message').text('Error on creating a event')
  $('.status-message').removeClass()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not create any events', error)
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 1000)
}

const showEventsSuccess = () => {
  $('.status-message').removeClass()
  $('.status-message').addClass('success')
  $('form').trigger('reset')
}

const showEventsFailure = function (error) {
  $('.status-message').text('Error on creating a event')
  $('.status-message').removeClass()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not create any events', error)
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 1000)
}

const updateEventsSuccess = () => {
  $('.status-message').text('Yay! You changed a event!')
  $('.status-message').removeClass()
  $('.status-message').addClass('success')
  $('form').trigger('reset')
}

const updateEventsFailure = function (error) {
  $('.status-message').text('Error on creating a event')
  $('.status-message').removeClass()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not create any events', error)
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 1000)
}

const deleteEventsFailure = function (error) {
  $('.status-message').text('Error on deleting a event')
  $('.status-message').removeClass()
  $('.status-message').addClass('failure')
  $('form').trigger('reset')
  console.error('did not delete any events', error)
  setTimeout(function () {
    $('.status-message').removeClass('failure')
    $('.status-message').fadeOut()
  }, 1000)
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
