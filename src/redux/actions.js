import * as actionTypes from './actiontypes';
import store from './store';

// user actions
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  }
}

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
}

// current channel
const currentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}

export const setCurrentChannel = channel => {
  store.dispatch(currentChannel(channel));
}

const privateChannel = isPrivateChannel => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel
    }
  }
}

export const setPrivateChannel = isPrivateChannel => {
  store.dispatch(privateChannel(isPrivateChannel));
}