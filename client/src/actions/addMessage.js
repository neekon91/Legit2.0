// ADD USER
//AJAX
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';

function requestAddMessage(messageInfo) {
  return {
    type: types.ADDMESSAGE_REQUEST,
    isFetching: true,
    payload: messageInfo
  }
};

function addedMessage(newMessage) {
  return {
    type: types.ADDMESSAGE_SUCCESS,
    isFetching: false,
    payload: newMessage,
    meta: {
        done: true,
        transition: (prevState, nextState, action) => ({
          pathname: '/home'
        })
      }
  };
}

function messageAddError(message) {
  return {
    type: types.ADDMESSAGE_FAILURE,
    isFetching: false,
    payload: null,
    message
  }
};

export function addMessage(messageInfo) {
  console.log("ADDMESSAGE", messageInfo);
  var Info = {
    sender: messageInfo.sender,
    receiver: messageInfo.receiver,
    message: messageInfo.message
  }
  return function(dispatch) {
    dispatch(requestAddMessage(Info));
      return axios.post('/api/add/message', { "sender": Info.sender, "receiver": Info.receiver, "message": Info.message })
        .then(function(response){
            dispatch(addedMessage(response.data));
            browserHistory.push('/home');
        })
        .catch(function(response){
            dispatch(MessageAddError(response));
        });
  }


}
