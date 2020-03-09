import blogService from "../services/blogs"


const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW':
            console.log("new")
            return state.concat(action.data)
        case 'INIT':
            console.log("init")
            return action.data
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs,
        })
    }
}
export const addBlog = (content) => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      console.log(newBlog, "newblog")
      dispatch({
        type: 'NEW',
        data: newBlog,
      })
      

    }
  }

export default reducer

  
