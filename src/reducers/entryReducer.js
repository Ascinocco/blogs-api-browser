import Immutable from 'immutable'

import { LIST_ENTRIES } from '../actions'

export default function blogsReducer(state = {}, action) {
  const immutableState = Immutable.fromJS(state)
  switch(action.type) {
    case LIST_ENTRIES:
      return immutableState.set('entries', action.data).toJS()
    default:
      return immutableState.toJS()
  }
}
