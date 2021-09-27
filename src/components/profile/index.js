import React, { useState } from 'react';
import firebase from './../../auth/firebase';

import './index.css';

function UserProfile (props) {
  const userName = props.userProfile.displayName;
  const userPhoto = props.userProfile.photoURL;

  const handleUser = () => {
    const modal = document.getElementById('user_modal');
    if (modal.classList.contains('d-none'))
      modal.classList.remove('d-none');
    else
      modal.classList.add('d-none');
  }
  
  const handleSignOut = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    })
  }

  return (
    (userName ? 
      <div className="user-profile">
        <img src={userPhoto} alt='profile' onClick={handleUser}/>
        <div id="user_modal" className="user-profile-modal d-none">
          <div onClick={handleSignOut} className="sign-out">Sign out</div>
        </div>
      </div>
      : 'loading...')
  )
}

export default UserProfile;