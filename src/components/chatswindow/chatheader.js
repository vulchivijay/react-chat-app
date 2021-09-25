import React from 'react';

function ChatHeader () {
  return (
    <div className="chat-window-header">
      <div className="row">
        <div className="col-md-8">
          <h5>
            <span>Channel </span>
            <i className="bi bi-star"></i>
          </h5>
          <span>2 users</span>
        </div>
        <div className="col-md-4">
          <input type="search" placeholder="Search"/>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader;