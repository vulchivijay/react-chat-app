import React, { useState } from 'react';
import firebase from './../../auth/firebase';

import ChatHeader from './chatheader';
import Messages from './messages';
import ChatForm from './chatform';

import './chat.css';

function ChatWindow (props) {
  const messagesRef = firebase.database().ref('messages');
  const user = props.currentUser;
  const channel = props.currentChannel;

  const [messages, setMessages] = useState([]); 

  const addListeners = (channelId) => {
    let loadedMessages = [];
    messagesRef
      .child(channelId)
      .on('child_added', snap => {
        loadedMessages.push(snap.val());
        setMessages(loadedMessages);
      })
  }

  useState(() => {
    if (user && channel) {
      addListeners(channel.id);
    }
  }, [messages])

  return (
    <div className="row">
      <div className="col-md-9 chat-window">
        <ChatHeader />
        <Messages messages={messages} />
        <ChatForm
          currentChannel={channel}
          currentUser={user}
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