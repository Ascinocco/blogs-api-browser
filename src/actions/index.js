import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const LIST_BLOGS = 'LIST_BLOGS'
const ERROR = 'ERROR'

export function listBlogs() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      // @TODO: Anthony - is this fake timeout why it keeps going?
      // const response = await new Promise(resolve => setTimeout(resolve, 3000)) // eslint-disable-line
      const response = await axios.get('http://localhost:8000/blogs') // eslint-disable-line
      // console.log('RESPONSE', response)
      dispatch({ type: LIST_BLOGS, data: response.data })
    } catch (error) {
      // @TODO: Anthony, dispatch error handling event here
      console.log(error)
    }
    dispatch(hideLoading())
    return 'done'
  }
}
