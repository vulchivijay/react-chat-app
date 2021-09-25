import React, { useEffect, useState } from 'react';
import firebase from './../../auth/firebase';
import { connect } from 'react-redux';

import './index.css';

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

function UserProfile (props) {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(props.currentUser.displayName);
  }, [user]);
  
  const handleSignOut = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    })
  }

  return (
    (user ? 
      <div className="user-profile">
        Sign in as <strong>{user}</strong>
        <span onClick={handleSignOut} className="sign-out">Sign out</span>
      </div>
      : 'loading...')
  )
}

export default connect(mapStateToProps)(UserProfile);