import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const LIST_ENTRIES = 'LIST_ENTRIES'

export function listEntries() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const response = await axios.get('http://localhost:8000/entries')
      dispatch({ type: LIST_ENTRIES, data: response.data })
    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}
