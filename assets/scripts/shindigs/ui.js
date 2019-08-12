const showEventsTemplate = require('../templates/handlebars/event-listing.handlebars')
const openedEvent = require('../templates/handlebars/event-page.handlebars')
const ownerButtons = require('../templates/owner-buttons.handlebars')
const store = require('../store')

const getEventsSuccess = (data) => {
  const showEventsHtml = showEventsTemplate({
    events: data.events
  })
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
  }, 5000)
}

const openEventSuccess = data => {
  store.current_event = data.event
  const openEventHTML = openedEvent({
    event: data.event,
    user: store.user
  })
  $('.content').html(openEventHTML)
  if (store.user && data.event.owner === store.user._id) {
    const ownerButtonsHTML = ownerButtons({
      event: data.event,
      editable: true
    })
    $('.content').append(ownerButtonsHTML)
  }
  $('.status-message').text('Attending this Event?')
  // setTimeout(function () {
  //   $('.status-message').fadeOut()
  // }, 5000)
}

const clearEvents = () => {
  $('.content').empty()
  $('.status-message').text('Cleared all the events!')
  // setTimeout(function () {
  //   $('.status-message').fadeOut()
  // }, 5000)
}

const createEventSuccess = (data) => {
  $('#create-event-modal').modal('hide')
  $('.modal-backdrop').hide()
  $('.status-message').text('You created an event')
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 5000)
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
  }, 5000)
}

const showEventsSuccess = () => {
  $('.status-message').text('All Events')
  $('.status-message').removeClass()
  $('.status-message').addClass('success')
  $('form').trigger('reset')
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 6000)
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
  }, 6000)
}

const updateEventsSuccess = () => {
  $('.status-message').text('Yay! You changed a event!')
  $('.status-message').removeClass()
  $('.status-message').addClass('success')
  $('form').trigger('reset')
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 6000)
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
  }, 6000)
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
  }, 6000)
}

const deleteEventSuccess = () => {
  $('.status-message').text('You deleted an event!').show()
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 5000)
  $('form').trigger('reset')
}

const failure = (error) => {
  $('.status-message').text('An Error Occurred').css('color', 'red')
  console.error(error)
}

const onRSVPSuccess = () => {
  $('.status-message').text("You're attending this event.")
  setTimeout(function () {
    $('.status-message').fadeOut()
  }, 6000)
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
  openEventSuccess,
  onRSVPSuccess,
  deleteEventSuccess
}
