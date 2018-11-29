import React from 'react'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import PropTypes from 'prop-types'

const AnecdoteList = ({castVote, setNotification, anecdotesToShow}) => {

  const anecdoteVoteHandler = (anecdote) => () => {
    castVote(anecdote)
    const notification = `Vote cast for "${anecdote.content}"`
    setNotification(notification, 3)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {
        anecdotesToShow
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              voteHandler={anecdoteVoteHandler}
            />
          )
      }
    </div>
  )
}

AnecdoteList.propTypes = {
  castVote: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  anecdotesToShow: PropTypes.array.isRequired
}

const anecdotesToShow = (anecdotes, filter) => {
  return (
    anecdotes.filter((anecdote) => {
      const content = anecdote.content.toLowerCase()
      return filter ? content.includes(filter.toLowerCase()) : true
    })
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.anecdoteFilter)
  }
}

const mapDispatchToProps = {
  setNotification: setNotification,
  castVote: castVote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
