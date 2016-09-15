// See actions/addStudent.js to see where actions are being dispatched
//Action Types
import {
  ADDSTUDENT_SUCCESS, ADDSTUDENT_REQUEST, ADDSTUDENT_FAILURE
} from '../constants/ActionTypes.js'


export default function studentsReducer(state = {}, action) {
  switch (action.type) {
    case ADDSTUDENT_REQUEST:
        // console.log("ADDSTUDENT_REQUEST")
        return Object.assign({}, state, {
            isFetching: true
        })
    case ADDSTUDENT_SUCCESS:
      // console.log("ADDSTUDENT_SUCCESS");
      return Object.assign({}, state, {
        isFetching: false,
        newStudent: action.payload
      })
    case ADDSTUDENT_FAILURE:
      // console.log("ADDSTUDENT_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
        newStudent: null,
      })
    default:
      return state
  }
};


// Uncomment the console logs to see when each of these are being hit
// Should see first 'ADDSTUDENT_REQUEST' consoled, then as soon as the 
// api call succeeds, should see 'ADDSTUDENT_SUCCESS'

