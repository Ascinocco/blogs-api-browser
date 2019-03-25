import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const FETCH_BLOG = 'FETCH_BLOG'
export const LIST_BLOGS = 'LIST_BLOGS'
// const ERROR = 'ERROR'

export function fetchBlog(id) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const response = await axios.get(`http://localhost:8000/blogs/${id}`)
      dispatch({ type: FETCH_BLOG, data: response.data })
    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log(error)
    }
    dispatch(hideLoading())
  }
}

export function listBlogs() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const response = await axios.get('http://localhost:8000/blogs')
      dispatch({ type: LIST_BLOGS, data: response.data })
    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log(error)
    }
    dispatch(hideLoading())
  }
}
