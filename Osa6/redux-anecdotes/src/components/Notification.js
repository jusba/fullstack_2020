import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notifications === null) {
    return(
      <div/>
    )
  }
  console.log(props.notifications)
  const notification = props.notifications.text
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification