const notificationStart = {
    text: 'alkuilmoitus'}
  
  
  const reducer = (state = notificationStart, action) => {
    switch (action.type) {
      case 'VOTE':
        return state
      case 'NEW':
        return state
      default:
        return state
    }
  }
  
  export default reducer