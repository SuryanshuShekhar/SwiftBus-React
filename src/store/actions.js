import { searchBuses } from '../api/apiClient'

export const runSearch = (params) => async (dispatch) => {
  dispatch({ type:'SEARCH_START' })
  try {
    const data = await searchBuses(params)
    dispatch({ type:'SEARCH_SUCCESS', payload: data })
  } catch (e){
    dispatch({ type:'SEARCH_FAIL', error: e.message })
  }
}
