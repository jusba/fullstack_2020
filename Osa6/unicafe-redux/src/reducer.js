const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedValue = {...state, good: state.good +1}
      return changedValue
    case 'OK':
      const changedValue2 = {...state, ok: state.ok +1}
      return changedValue2
    case 'BAD':
      const changedValue3 = {...state, bad: state.bad +1}
      return changedValue3
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer