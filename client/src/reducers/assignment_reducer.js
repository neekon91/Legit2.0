import {
  ADDASSIGNMENT_SUCCESS, ADDASSIGNMENT_REQUEST, ADDASSIGNMENT_FAILURE
} from '../constants/ActionTypes.js';


export default function studentsReducer(state = {}, action) {
  switch (action.type) {
    case ADDASSIGNMENT_REQUEST:
        console.log("ADDSTUDENT_REQUEST");
        return Object.assign({}, state, {
            isFetching: true,
        })
    case ADDASSIGNMENT_SUCCESS:
      console.log("ADDASSIGNMENT_SUCCESS");
      return Object.assign({}, state, {
        isFetching: false,
        newAssignment: action.newAssignment,
      })
    case ADDASSIGNMENT_FAILURE:
      console.log("ADDASSIGNMENT_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
        newAssignment: null,
      })
    default:
      return state;
  }
};