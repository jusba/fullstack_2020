const notificationStart = {
    text: 'something happened'}
  
  
  const reducer = (state = notificationStart, action) => {
    switch (action.type) {
      case 'VOTE_NOTI':
        return {text: `you voted ${action.data.content}`}
      case 'NEW_NOTI':
        return {text: `you added ${action.data.content}`}
      case 'ZERO' :
        return null
      default:
        return null
    }
  }
  export const voteNotification = (content) => {
    return {
      type: 'VOTE_NOTI',
      data: { content: content }
    }
  }
  export const addNotification = (content) => {
    return {
      type: 'NEW_NOTI',
      data: { content: content }
    }
  }
  export const clear = () => {
    return {
      type: 'ZERO',
    }
  }
  
  export default reducer