import Immutable from 'immutable'

import { LIST_BLOGS } from '../actions'

export default function blogsReducer(state = {}, action) {
  const immutableState = Immutable.fromJS(state)
  switch(action.type) {
    case LIST_BLOGS:
      return immutableState.set('blogs', action.data).toJS()
    default:
      return immutableState.toJS()
  }
}
