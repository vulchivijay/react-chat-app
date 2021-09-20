import * as actionTypes from './actiontypes';

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
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}