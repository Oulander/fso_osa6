const initialState = ''


const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'SETNOTIFICATION': {
    return action.text
  }
  default: return store
  }
}

export const setNotification = (text, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SETNOTIFICATION',
      text: text
    })
    setTimeout(() => {
      dispatch({
        type: 'SETNOTIFICATION',
        text: ''
      })
    }, timeout * 1000)
  }
}



export default notificationReducer
