import React from 'react';

function ChatForm () {
  return (
    <div className="chat-window-form">
      <textarea></textarea>
      <div className="btn-group space-between">
        <input type="file"></input>
        <button>Send message</button>
      </div>
    </div>
  )
}

export default ChatForm;