const filterStart = ""
    



const reducer = (state = filterStart, action) => {
    switch (action.type) {
        case 'FILTER':
            const newState  = action.data
            return newState
        default:
            return state
    }
}

export const filter = (text) => {
    return{
        type: 'FILTER',
        data: text
    }
}
export default reducer