import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { LIST_AUTHORS } from './authorActions'
import { LIST_BLOGS } from './blogActions'
import { LIST_COMMENTS } from './commentActions'
import { LIST_ENTRIES } from './entryActions'

export function startLoading() {
  return async (dispatch) => {
    dispatch(showLoading())
  }
}

export function stopLoading() {
  return async (dispatch) => {
    dispatch(hideLoading())
  }
}

export function initializeStoreFromApi() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const blogData = await axios.get('http://localhost:8000/blogs')
      const entriesData = await axios.get('http://localhost:8000/entries')
      const authorsData = await axios.get('http://localhost:8000/authors')
      const commentsData = await axios.get('http://localhost:8000/comments')

      dispatch({ type: LIST_BLOGS, data: blogData.data })
      dispatch({ type: LIST_ENTRIES, data: entriesData.data })
      dispatch({ type: LIST_AUTHORS, data: authorsData.data })
      dispatch({ type: LIST_COMMENTS, data: commentsData.data })

    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}

export * from './authorActions'
export * from './blogActions'
export * from './commentActions'
export * from './entryActions'
