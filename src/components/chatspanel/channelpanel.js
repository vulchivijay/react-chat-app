import React, { useState } from 'react';
import Channels from './channels';
import Chats from './chats';

import './index.css';

function ChannelPanel (props) {
  const user = props.userProfile;
  const [activeFeature, setActiveFeature] = useState('channels');

  const handleChange = (name) => {
    // console.log(name);
  }

  return (
    <div className="row">
      <div className="col-md-2 chat-features">
        <ul className="features-list">
          <li className={"chat-channel-icon " + (activeFeature === 'channels' ? 'active' : '')} onClick={handleChange('channels')}>
            <i className="bi bi-person-lines-fill"></i>
            <i className="bi bi-person-lines-fill"></i>
            <span>Channels</span>
          </li>
          <li className={"chat-icon " + (activeFeature === 'chats' ? 'active' : '')} onClick={handleChange('chats')}>
            <i className="bi bi-chat-text-fill"></i>
            <span>Chats</span>
          </li>
        </ul>
      </div>
      <div className="col-md-10 list-panel">
        <Channels currentUser={user} />
        <Chats currentUser={user} />
      </div>
    </div>
  )
}

export default ChannelPanel;