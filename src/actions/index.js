import axios from 'axios'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { LIST_BLOGS } from './blogActions'
import { LIST_ENTRIES } from './entryActions'

export function initializeStoreFromApi() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const blogData = await axios.get('http://localhost:8000/blogs')
      const entriesData = await axios.get('http://localhost:8000/entries')
      console.log('ENTRIES_DATA', entriesData)
      dispatch({ type: LIST_BLOGS, data: blogData.data })
      dispatch({ type: LIST_ENTRIES, data: entriesData.data })
    } catch (error) {
      // dispatch({ type: ERROR, error: '' })
      console.log('ERROR', error)
    }
    dispatch(hideLoading())
  }
}

export * from './blogActions'
export * from './entryActions'
