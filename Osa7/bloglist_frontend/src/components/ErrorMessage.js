import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

const Notification = () => {
  const notification = useSelector(state => state)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(notification)
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