import React, { useState } from 'react';
import Channels from './channels';
import Chats from './chats';

import './index.css';

function ChannelPanel (props) {
  const user = props.userProfile;
  const [activeFeature, setActiveFeature] = useState('chats');

  const handleChange = (name) => {
    setActiveFeature(name);
  }

  return (
    <div className="row">
      <div className="col-md-2 chat-features">
        <ul className="features-list">
          <li className={"chat-icon " + (activeFeature === 'chats' ? 'active' : '')} onClick={() => handleChange('chats')}>
            <i className="bi bi-chat-text-fill"></i>
            <span>Chats</span>
          </li>
          <li className={"chat-channel-icon " + (activeFeature === 'channels' ? 'active' : '')} onClick={() => handleChange('channels')}>
            <i className="bi bi-person-lines-fill"></i>
            <i className="bi bi-person-lines-fill"></i>
            <span>Teams</span>
          </li>
        </ul>
      </div>
      <div className="col-md-10 list-panel">
        {( activeFeature === 'channels' ? <Channels currentUser={user} /> : '' )}
        {( activeFeature === 'chats' ? <Chats currentUser={user} /> : '' )}
      </div>
    </div>
  )
}

export default ChannelPanel;