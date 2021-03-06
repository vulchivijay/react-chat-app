import React, { useState, useEffect } from 'react';
import firebase from './../../auth/firebase';

import ChatHeader from './chatheader';
import Messages from './messages';
import ChatForm from './chatform';

import './chat.css';

function ChatWindow (props) {
  const messagesRef = firebase.database().ref('messages');
  const user = props.currentUser;
  const channel = props.currentChannel;
  const [uniqueUsers, setUniqueUsers] = useState(0);

  const [messages, setMessages] = useState([]);
  const [isMessagesLoaded, setIsMessagesLoaded] = useState(false);

  const countUniqueUsers = messages => {
    const uniqueUser = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name))
        acc.push(message.user.name);
      return acc;
    }, []);
    setUniqueUsers(uniqueUser.length);
  }

  const addMessageListeners = (channelId) => {
    let loadedMessages = [];
    messagesRef
      .child(channelId)
      .on('child_added', snap => {
        loadedMessages.push(snap.val());
        setMessages(loadedMessages);
        countUniqueUsers(loadedMessages);
        setIsMessagesLoaded(true);
      });
  }

  useEffect(() => {
    if (user && channel)
      addMessageListeners(channel.id);
  }, [isMessagesLoaded])

  return (
    <div className="row">
      <div className="col-md-12 chat-window">
        <ChatHeader
          currentChannel={channel}
          uniqueUsers={uniqueUsers}
        />
        <Messages messages={messages} />
        <ChatForm
          currentChannel={channel}
          currentUser={user}
          messagesRef={messagesRef}
        />
      </div>
    </div>
  )
}

export default ChatWindow;