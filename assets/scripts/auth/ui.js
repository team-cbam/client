'use strict'

const signInScreen = require('../templates/sign-in-screen.handlebars')
const signUpScreen = require('../templates/sign-up-screen.handlebars')
const signedInSidebar = require('../templates/signed-in-sidebar.handlebars')
const store = require('./../store')
const api = require('./api.js')
// const api = require('./api')

const signedIn = () => {
  const sidebar = signedInSidebar()
  $('.sidebar').html(sidebar)
  $('form').trigger('reset')
}

const signedOut = () => {
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
  store.user = data.user

  api.signIn(store.save)
    .then(signInSuccess)
}

const signUpFailure = data => {
  $('.auth-message').html('<p>Sign Up Failed</p>')
  $('form').trigger('reset')
}

const signInSuccess = data => {
  console.log('here')
  $('.auth-message').html('<p>Sign In Successful!</p>')
  signedIn()
  store.user = data.user
}

const signInFailure = data => {
  $('.auth-message').html('<p>Sign In Failed!</p>')
  $('form').trigger('reset')
}

const changePasswordSuccess = data => {
  $('.auth-message').html('<p>Password changed successfully!</p>')
  $('form').trigger('reset')
  $('.dropdown-toggle').dropdown('hide')
  // $('#change-password-modal').modal('hide')
}

const changePasswordFailure = data => {
  $('.auth-message').html('<p>Sorry, we were unable to change your password</p>')
  $('form').trigger('reset')
}

const signOutSuccess = data => {
  $('.auth-message').html('<p>Signed out successfully</p>')
  store.user = null
  signedOut()
}

const signOutFailure = data => {
  $('.auth-message').html('<p>Sorry, we were unable to sign you out</p>')
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
