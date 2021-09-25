import React from 'react';
import ChatHeader from './chatheader';
import ChatForm from './chatform';

import './chat.css';

function ChatWindow () {
  return (
    <div className="row">
      <div className="col-md-9 chat-window">
        <ChatHeader />
        <div className="chat-messages"> chat container </div>
        <ChatForm />
      </div>
      <div className="col-md-3 chat-userslist">
        users list
      </div>
    </div>
  )
}

export default ChatWindow;