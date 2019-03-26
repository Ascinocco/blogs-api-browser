import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const LIST_BLOGS = 'LIST_BLOGS'

export function listBlogs() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const response = await axios.get('http://localhost:8000/blogs')
      dispatch({ type: LIST_BLOGS, data: response.data })
    } catch (error) {
      // Here's where I'd catch an error and dispatch an error action
      // I would use the Page component to recieve that error and display it in a generic location
      // there could also be different types of styling based on the messages
      // dispatch({ type: ERROR, error: 'Some message' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}
