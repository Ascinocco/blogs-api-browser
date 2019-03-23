import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { loadingBarReducer } from 'react-redux-loading-bar';

import blogsReducer from './blogsReducer' 

const rootReducer = (history) => combineReducers({
  blogs: blogsReducer,
  router: connectRouter(history),
  loadingBar: loadingBarReducer
})

export default rootReducer
