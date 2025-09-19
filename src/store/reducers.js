import { combineReducers } from 'redux'

const initialSearch = { list: [], loading:false, error:null }
function search(state=initialSearch, action){
  switch(action.type){
    case 'SEARCH_START': return { ...state, loading:true, error:null }
    case 'SEARCH_SUCCESS': return { ...state, loading:false, list: action.payload }
    case 'SEARCH_FAIL': return { ...state, loading:false, error: action.error }
    default: return state
  }
}

const initialCart = { selected:null }
function cart(state=initialCart, action){
  switch(action.type){
    case 'SELECT_BUS': return { selected: action.payload }
    default: return state
  }
}

export default combineReducers({ search, cart })
