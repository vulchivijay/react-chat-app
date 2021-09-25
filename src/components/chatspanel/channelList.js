import React from 'react';
import Channels from './channels';

import './index.css';

function ChannelList (props) {
  return (
    <Channels userProfile={props}/>
  )
}

export default ChannelList;