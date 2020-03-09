import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  console.log(notification)
  /*const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }*/

  if (notification === null) {
    return(
      <div/>
    )
  }
  return (
    <div className="error">
      {notification.text}
    </div>
  )
}

export default Notification