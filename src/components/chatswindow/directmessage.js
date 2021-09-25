import React, { useEffect, useState } from 'react';
import firebase from './../../auth/firebase';

function DirectMessages (props) {
  const user = props.currentUser;
  const [users, setUsers] = useState();
  const usersRef = firebase.database().ref('users');
  const connectedRef = firebase.database().ref('.info/connected');
  const presenceRef = firebase.database().ref('presence');

  const addStatusToUser = (userUid, connected = true) => {
    const updatedUsers = users.reduce((acc, user) => {
      if (user.uid === userUid) {
        user['status'] = `${connected ? 'online' : 'offline'}`;
      }
      return acc.concat(user);
    }, []);
    setUsers(updatedUsers);
  }

  const addListeners = userUid => {
    let loadedUsers = [];
    usersRef.on('child_added', snap => {
      if (userUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';
        loadedUsers.push(user);
        setUsers(loadedUsers);
      }
    });

    connectedRef.on('value', snap => {
      if(snap.val() === true) {
        let ref = presenceRef.child(userUid);
        ref.set(true);
        ref.onDisconnect().remove(error => {
          if (error !== null) {
            console.log(error);
          }
        })
      }
    });

    presenceRef.on('child_added', snap => {
      if (userUid !== snap.key) {
        addStatusToUser(snap.key);
      }
    });

    presenceRef.on('child_removed', snap => {
      if (userUid !== snap.key) {
        addStatusToUser(snap.key, false);
      }
    });
  }

  const isUserStatus = user => {
    return user.status === 'online'; 
  }

  useEffect(() => {
    if (user) {
      addListeners(user.uid);
    }
  }, [user]);

  return (
    <div className="col-md-3 chat-userslist">
      <h5>Chat ({users ? users.length : '0'})</h5>
      <ul className="users-list">
        {
          users && users.map((user) => {
            return (
            <li key={user.uid} onClick={() => console.log(user) }>
              <i className="bi bi-circle-fill" style={{color: isUserStatus(user) ? '#20c997' : '#dee2e6' }}></i> {' '}
              <span>{ user.name }</span>
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DirectMessages;