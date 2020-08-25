import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notification}) => {
    
    if ( !notification ) {
      return null
    } else {
      const style = {
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        color: notification[1] === 'success' ? 'green' : 'red',
        background: 'lightgrey'
      }
    
      return <div style={style}>
        {notification[0]}
      </div>
    }
  })
  return notification
}

export default Notification