import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { loadingBarReducer } from 'react-redux-loading-bar';

import counterReducer from './counterReducer'
import blogsReducer from './blogsReducer' 

const rootReducer = (history) => combineReducers({
  count: counterReducer,
  blogs: blogsReducer,
  router: connectRouter(history),
  loadingBar: loadingBarReducer
})

export default rootReducer
