import React, { useEffect, useState } from 'react';
import firebase from './../../auth/firebase';

import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from './../../redux/actions';

function Chats (props) {
  const user = props.currentUser;

  const usersRef = firebase.database().ref('users');
  const connectedRef = firebase.database().ref('.info/connected');
  const presenceRef = firebase.database().ref('presence');

  const [users, setUsers] = useState();
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  // const [isUsersLoaded, setIsUsersLoaded] = useState(false);

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
        setIsUsersLoaded(true);
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
      if (userUid !== snap.key && users) {
        addStatusToUser(snap.key);
      }
    });

    presenceRef.on('child_removed', snap => {
      if (userUid !== snap.key && users) {
        addStatusToUser(snap.key, false);
      }
    });
  }

  const isUserStatus = user => {
    return user.status === 'online'; 
  }

  const getChannelId = userId => {
    const currentUserId = user.uid;
    return userId < currentUserId ?
      `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  }

  const changeChannel = user => {
    const channelId = getChannelId(user.uid);
    const channelData = {
      id: channelId,
      name: user.name
    }
    setCurrentChannel(channelData);
    setPrivateChannel(true);
    setSelectedUser(user.name);
  }

  useEffect(() => {
    if (user) {
      addListeners(user.uid);
      if(users && users.length > 0) {
        const defaultUser = users[0];
        const channelId = getChannelId(user.uid);
        const channelData = {
          id: channelId,
          name: defaultUser.name
        }
        setCurrentChannel(channelData);
        setPrivateChannel(true);
        setSelectedUser(defaultUser.name);
      }
    }
  }, [isUsersLoaded]);

  return (
    (users && users.length > 0 ? <div className="chat-userslist">
      <h6>
        <span>Chat ({users ? users.length : '0'})</span>
      </h6>
      <ul className="row users-list">
        {
          users && users.map((user) => {
            return (
            <li
              className={"d-flex a-center " + (user.name === selectedUser ? 'active': '')}
              key={user.uid}
              onClick={() => changeChannel(user) }>
              <figure>
                <img src={user.avatar} alt={user.name} />
                <figcaption>
                  <i className="bi bi-circle-fill" style={{color: isUserStatus(user) ? '#20c997' : '#dee2e6' }}></i> {' '}
                </figcaption>
              </figure>
              <span>{ user.name }</span>
            </li>
            )
          })
        }
      </ul>
    </div>
    : 'loading...')
  );
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Chats);