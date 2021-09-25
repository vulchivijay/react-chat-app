import React, { useEffect, useState } from 'react';
import firebase from './../../auth/firebase';

import './index.css';

function UserProfile (props) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(props.userProfile.displayName);
  }, [userName]);
  
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
        <span onClick={handleSignOut} className="sign-out">Sign out</span>
      </div>
      : 'loading...')
  )
}

export default UserProfile;