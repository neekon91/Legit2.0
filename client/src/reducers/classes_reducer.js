// See actions/addClass.js to see where actions are being dispatched

//Action Types
import {
  ADDCLASS_SUCCESS, ADDCLASS_REQUEST, ADDCLASS_FAILURE
} from '../constants/ActionTypes.js'

export default function classesReducer(state = {}, action) {
  switch (action.type) {
    case ADDCLASS_REQUEST:
        console.log("ADDCLASS_REQUEST")
        return Object.assign({}, state, {
            isFetching: true,
        })
    case ADDCLASS_SUCCESS:
      console.log("ADDCLASS_SUCCESS");
      return Object.assign({}, state, {
        isFetching: false,
        newClass: action.payload,
      })
    case ADDCLASS_FAILURE:
      console.log("ADDCLASS_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
        newClass: null,
      })
    default:
      return state
  }
};