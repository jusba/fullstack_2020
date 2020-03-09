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
        case 'UPDATE':
            const id = action.data.id
            const likedBlog = state.find(b => b.id === id)
            const changedBlog = {
                ...likedBlog, votes: likedBlog.votes
            }
            return state.map(b =>
                b.id !== id ? b : changedBlog
            )
        case 'DELETE':
            return state.filter(b =>
                b.id !== action.data.id
                )
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
    console.log(content)
    return async dispatch => {
        const newBlog = await blogService.create(content)
        console.log(newBlog, "newblog")
        dispatch({
            type: 'NEW',
            data: newBlog,
        })


    }
}
export const likeBlog = (object) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(object)
        dispatch({
            type: 'UPDATE',
            data: { id: updatedBlog.id}
        })
    }
}
export const deleteBlog = (object) => {
    return async dispatch => {
        const deletedBlog = await blogService.deleteBlog(object.id)
        console.log(deleteBlog)
        dispatch({
            type: 'DELETE',
            data: { id: object.id , blog: object}
        })
    }
}

export default reducer


