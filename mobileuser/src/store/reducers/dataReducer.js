import { FETCH_DATA, IS_ERROR, IS_LOADING } from "../actiontype";

const initialState = {
  data: [],
  error: null,
  loading: true
}

function reducer (state = initialState, action) {
  if (action.type === FETCH_DATA) {
    return {...state, data: action.payload}
  } else if (action.type === IS_ERROR) {
    return {...state, error: action.payload}
  } else if (action.type === IS_LOADING) {
    return {...state, loading: action.payload}
  }
  return state
}

export default reducer