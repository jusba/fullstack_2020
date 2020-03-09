const notificationStart = {
    text: 'something happened'}
  
  
  const reducer = (state = notificationStart, action) => {
    switch (action.type) {
      case 'NOTI':
        return { text: action.data.content }
      case 'ZERO' :
        return null
      case 'NEW':
        //aivan hiveä purkkaratkaisu, en en ymmärrä mistä saan tänne new dispatchin, mutta tälleen 
        //parin tunnin väännön jälkeen pakko mennä eteenpäin
        console.log(action.data.content)
        return { text: `a new blog ${action.data.title} by ${action.data.author}`}
      default:
        console.log("defaulttas")
        return null
    }
  }
  
  let timeOut = ""
  
  export const setNotification = (content, time) => {
    console.log("dafak taas vittu")
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