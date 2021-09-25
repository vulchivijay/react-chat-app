import React from 'react';

function Messages (props) {
  return (
    <div className="chat-messages">
      {
        props.messages && props.messages.map(msg => {
          return <div className="row message-box" key={msg.timestamp}>
            <div className="col-md-1">
              <img src={msg.user.avatar} alt='avatar' />
            </div>
            <div className="col-md-11">
              <span className="message">{msg.content}</span>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Messages;