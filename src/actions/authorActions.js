import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const LIST_AUTHORS = 'LIST_AUTHORS'

export function listAuthors() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const response = await axios.get('http://localhost:8000/authors')
      dispatch({ type: LIST_AUTHORS, data: response.data })
    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}
