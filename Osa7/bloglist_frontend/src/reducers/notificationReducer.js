const notificationStart = {
    text: 'something happened'}
  
  
  const reducer = (state = notificationStart, action) => {
    switch (action.type) {
      case 'NOTI':
        return { text: action.data.content }
      case 'ZERO' :
        return null
      default:
        return null
    }
  }
  
  let timeOut = ""
  
  export const setNotification = (content, time) => {

    return async dispatch => {
      console.log(timeOut)
      clearTimeout(timeOut)
      dispatch({
        type: 'NOTI',
        data: { content: content }
      })
      timeOut = setTimeout(() => {
          dispatch(clear())
      }, time * 1000)
      
      
      
    }
  }
  
  export const clear = () => {
    return {
      type: 'ZERO',
    }
  }
  export default reducer