import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { loadingBarReducer } from 'react-redux-loading-bar';

import authorReducer from './authorReducer'
import blogsReducer from './blogReducer'
import commentReducer from './commentReducer'
import entryReducer from './entryReducer'

const rootReducer = (history) => combineReducers({
  authors: authorReducer,
  blogs: blogsReducer,
  comments: commentReducer,
  entries: entryReducer,
  router: connectRouter(history),
  loadingBar: loadingBarReducer
})

export default rootReducer
