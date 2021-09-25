import React from 'react';
import firebase from './../../auth/firebase';

import ChatHeader from './chatheader';
import ChatForm from './chatform';

import './chat.css';

function ChatWindow (props) {
  const messagesRef = firebase.database().ref('messages');
  const currentUser = props.currentUser;
  const channel = props.currentChannel;

  return (
    <div className="row">
      <div className="col-md-9 chat-window">
        <ChatHeader />
        <div className="chat-messages"> chat container </div>
        <ChatForm
          currentChannel={channel}
          currentUser={currentUser}
          messagesRef={messagesRef}
        />
      </div>
      <div className="col-md-3 chat-userslist">
        <h5>Contacts (0)</h5>
      </div>
    </div>
  )
}

export default ChatWindow;