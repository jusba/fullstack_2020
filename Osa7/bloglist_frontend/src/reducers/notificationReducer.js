const notificationStart = {
  text: 'something happened'
}


const reducer = (state = notificationStart, action) => {
  console.log(action.type)
  switch (action.type) {
  case 'NOTI':
    return { text: action.data.content }
  case 'ZERO':
    return null
  case 'NEW':
    //aivan hiveä purkkaratkaisu, en en ymmärrä mistä saan tänne new dispatchin, mutta tälleen
    //parin tunnin väännön jälkeen pakko mennä eteenpäin
    return { text: `a new blog ${action.data.title} by ${action.data.author} added` }
  case 'DELETE':
    console.log(action.data)
    return { text: `removed ${action.data.blog.title} by ${action.data.blog.author}` }
  default:
    console.log('defaulttas')
    return null
  }
}

let timeOut = ''

export const setNotification = (content, time) => {
  console.log('dafak taas vittu')
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