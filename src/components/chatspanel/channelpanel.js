import React from 'react';
import Channels from './channels';
import DirectMessages from './directmessage';

import './index.css';

function ChannelPanel (props) {
  const user = props.userProfile;

  return (
    <>
      <Channels currentUser={user}/>
      <DirectMessages currentUser={user} />
    </>
  )
}

export default ChannelPanel;