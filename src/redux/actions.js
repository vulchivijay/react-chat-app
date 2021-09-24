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
export const setCurrentChannel = channel => {
  store.dispatch(currentChannel(channel));
}

export const currentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}