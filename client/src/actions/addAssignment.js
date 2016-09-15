// ADD USER
//AJAX
import axios from 'axios';

import { browserHistory } from 'react-router';

import * as types from '../constants/ActionTypes';

function requestAddAssignment(assignmentInfo) {
  return {
    type: types.ADDASSIGNMENT_REQUEST,
    isFetching: true,
    payload: assignmentInfo
  }
};

function addedAssignment(newAssignment) {
  return {
    type: types.ADDASSIGNMENT_SUCCESS,
    isFetching: false,
    payload: newAssignment,
    meta: {
        done: true,
        transition: (prevState, nextState, action) => ({
          pathname: '/home'
        })
      }
  };
}

function assignmentAddError(message) {
  return {
    type: types.ADDASSIGNMENT_FAILURE,
    isFetching: false,
    payload: null,
    message
  }
};

export function addAssignment(assignInfo) {
  console.log("ADDASSIGN", assignInfo);
  var Info = {
    name: assignInfo.name,
    maxScore: assignInfo.maxScore,
    sectionId: assignInfo.sectionId
  }
  return function(dispatch) {
    dispatch(requestAddAssignment(Info));
      return axios.post('/api/add/assignments', { "name": Info.name, "maxScore": Info.maxScore, "SectionId": Info.sectionId })
        .then(function(response){
            dispatch(addedAssignment(response.data));
            browserHistory.push('/home');
        })
        .catch(function(response){
            dispatch(assignmentAddError(response));
        });
  }


}