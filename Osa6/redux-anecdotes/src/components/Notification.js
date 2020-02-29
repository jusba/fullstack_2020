import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(notification.text)
  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification