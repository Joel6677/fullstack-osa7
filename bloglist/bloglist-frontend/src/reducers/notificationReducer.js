
const reducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      case 'CLEAR_NOTIFICATION':
        return null
      default: 
        return state
    }
  }
  
  
  export const setNotification = (content, seconds, messageType) => {
    return dispatch => {
        
      dispatch({
        type: 'SET_NOTIFICATION',
        data: [content, messageType]
      })
  
  
     setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }, seconds * 1000)
    }
  }
  
  export const clearNotification = () => (
    { type: 'CLEAR_NOTIFICATION' }
  )
  
  export default reducer