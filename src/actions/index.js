import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { LIST_BLOGS } from './blogActions'

export const LIST_AUTHORS = 'LIST_AUTHORS'
export const LIST_COMMENTS = 'LIST_COMMENTS'
export const LIST_ENTRIES = 'LIST_ENTRIES'


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
      // Here's where I'd catch an error and dispatch an error action
      // I would use the Page component to recieve that error and display it in a generic location
      // there could also be different types of styling based on the messages
      // dispatch({ type: ERROR, error: 'Some message' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}

export * from './blogActions'
