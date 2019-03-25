import Immutable from 'immutable'

import { LIST_COMMENTS } from '../actions'

export default function commentReducer(state = {}, action) {
  const immutableState = Immutable.fromJS(state)
  switch(action.type) {
    case LIST_COMMENTS:
      return immutableState.set('comments', action.data).toJS()
    default:
      return immutableState.toJS()
  }
}
