import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { loadingBarReducer } from 'react-redux-loading-bar';

import blogsReducer from './blogReducer'
import entryReducer from './entryReducer'

const rootReducer = (history) => combineReducers({
  blogs: blogsReducer,
  entries: entryReducer,
  router: connectRouter(history),
  loadingBar: loadingBarReducer
})

export default rootReducer
