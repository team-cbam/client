'use strict'

const signInScreen = require('../templates/sign-in-screen.handlebars')
const signUpScreen = require('../templates/sign-up-screen.handlebars')
const signedInSidebar = require('../templates/signed-in-sidebar.handlebars')
const signedOutSidebar = require('../templates/signed-out-sidebar.handlebars')
const store = require('./../store')
const api = require('./api.js')
const shinDigsEvents = require('../shindigs/events')
// const api = require('./api')

const signedIn = () => {
  const sidebar = signedInSidebar()
  $('.sidebar').html(sidebar)
  $('form').trigger('reset')
  shinDigsEvents.onGetAllEvents()
}

const signedOut = () => {
  const sidebar = signedOutSidebar()
  $('.sidebar').html(sidebar)
  $('form').trigger('reset')
}

const showSignUp = () => {
  const signUpHTML = signUpScreen()
  $('.sidebar').html(signUpHTML)
}

const showSignIn = () => {
  const signInHTML = signInScreen()
  $('.sidebar').html(signInHTML)
}

const signUpSuccess = data => {
  $('.auth-message').html('<p>Sign Up Successful!</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  store.user = data.user

  api.signIn(store.save)
    .then(signInSuccess)
}

const signUpFailure = data => {
  $('.auth-message').html('<p>Sign Up Failed</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  $('form').trigger('reset')
}

const signInSuccess = data => {
  $('.auth-message').html('<p>Sign In Successful!</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  signedIn()
  store.user = data.user
}

const signInFailure = data => {
  $('.auth-message').html('<p>Sign In Failed</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  $('form').trigger('reset')
}

const changePasswordSuccess = data => {
  $('.auth-message').html('<p>Password was changed successfully</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  $('form').trigger('reset')
  $('.dropdown-toggle').dropdown('hide')
  // $('#change-password-modal').modal('hide')
}

const changePasswordFailure = data => {
  $('.password-message').html('<p>Sorry, we were unable to change your password</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  $('form').trigger('reset')
}

const signOutSuccess = data => {
  $('.auth-message').html('<p>Signed out successfully</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  store.user = null
  signedOut()
}

const signOutFailure = data => {
  $('.auth-message').html('<p>Sorry, we were unable to log you out</p>')
  $('.auth-message').show()
  setTimeout(function () {
    $('.auth-message').fadeOut()
  }, 2000)
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  signedOut,
  signedIn,
  showSignUp,
  showSignIn
}
