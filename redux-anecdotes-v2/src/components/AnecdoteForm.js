import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AnecdoteForm = ({createAnecdote, setNotification}) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    createAnecdote(content)

    const notification = `Anecdote "${content}" created!`

    setNotification(notification, 3)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  createAnecdote: createAnecdote,
  setNotification: setNotification
}


export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
