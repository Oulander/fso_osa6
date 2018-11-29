import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const NotificationComponent = ({notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: (notification && notification.length > 0) ? '' : 'none'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

NotificationComponent.propTypes = {
  notification: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const Notification = connect(mapStateToProps)(NotificationComponent)

export default Notification
