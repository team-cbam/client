const addDelete = (host, user) => {
  console.log('here!!')
  if (host === user) {
    $('.delete-button').html("<button class='delete-event'>Delete Event</button>")
  }
}

module.exports = addDelete
