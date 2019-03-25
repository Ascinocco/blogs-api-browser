import Immutable from 'immutable'

import {
  FETCH_BLOG,
  LIST_BLOGS
} from '../actions'

export default function blogsReducer(state = {}, action) {
  const immutableState = Immutable.fromJS(state)
  switch(action.type) {
    case FETCH_BLOG:
      const temp = immutableState.set('blog', action.data.data).toJS()
      return temp
    case LIST_BLOGS:
      return immutableState.set('blogs', action.data).toJS()
    default:
      return immutableState.toJS()
  }
}
