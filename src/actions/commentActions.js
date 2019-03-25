import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const LIST_COMMENTS = 'LIST_COMMENTS'

export function listComments() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const response = await axios.get('http://localhost:8000/comments')
      dispatch({ type: LIST_COMMENTS, data: response.data })
    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}
