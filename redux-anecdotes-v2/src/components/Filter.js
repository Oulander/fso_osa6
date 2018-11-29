import React from 'react'
import { setAnecdoteFilter } from '../reducers/anecdoteFilterReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const FilterComponent = ({setAnecdoteFilter}) => {
  const handleChange = (event) => {
    setAnecdoteFilter(event.target.value)
  }
  const style = {
    marginBottom: 20
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange}/>
    </div>
  )
}

FilterComponent.propTypes = {
  setAnecdoteFilter: PropTypes.func.isRequired
}


const mapDispatchToProps = {
  setAnecdoteFilter
}

const Filter = connect(
  null,
  mapDispatchToProps
)(FilterComponent)

export default Filter
