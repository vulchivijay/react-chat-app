import React from 'react';

function ChatHeader (props) {
  return (
    <div className="chat-window-header d-none">
      <div className="row">
        <div className="col-md-8">
          <h5>
            <span>{ props.currentChannel ? props.currentChannel.name : '' } </span>
            <i className="bi bi-star"></i>
          </h5>
          <span>{props.uniqueUsers} user(s)</span>
        </div>
        <div className="col-md-4">
          <input type="search" placeholder="Search"/>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader;