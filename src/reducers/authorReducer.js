import Immutable from 'immutable'

import { LIST_AUTHORS } from '../actions'

export default function authorReducer(state = {}, action) {
  const immutableState = Immutable.fromJS(state)
  switch(action.type) {
    case LIST_AUTHORS:
      return immutableState.set('authors', action.data).toJS()
    default:
      return immutableState.toJS()
  }
}
