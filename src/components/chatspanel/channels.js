import React, { useEffect, useState } from 'react';
import firebase from '../../auth/firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from './../../redux/actions';

import './index.css';

function Channels (props) {
  const channelsRef = firebase.database().ref('channels');

  const userName = props.currentUser.displayName;
  const userPhotoUrl = props.currentUser.photoURL;

  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelDesc, setChannelDesc] = useState('');
  const [activeChannel, setActiveChannel] = useState('');
  const [isChannelsLoaded, setIsChannelsLoaded] = useState(false);

  const handleChange = event => {
		if (event.target.name === 'channelName')
      setChannelName(event.target.value.replace(/\s/g, '').toLowerCase())
		else
      setChannelDesc(event.target.value);
	}

  const isFormValid  = (name, desc) => {
    if (name && desc)
      return true;
    else
      return false
  }

  const addChannel = () => {
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDesc,
      createdBy: {
        name: userName,
        avatar: userPhotoUrl
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setChannelName('');
        setChannelDesc('');
        // close modal
        console.log('Channel added')
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (isFormValid(channelName, channelDesc))
      addChannel();
    else
      console.log('channel not added!');
  }

  const channelListners = () => {
    let loadedChannels = [];
    channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
      setCurrentChannel(loadedChannels[0]);
      setActiveChannel(loadedChannels[0].id);
      setIsChannelsLoaded(true);
    })
  }

  const changeChannel = channel => {
    setActiveChannel(channel.id);
    setCurrentChannel(channel);
  }

  useEffect(() => {
    console.log('channels');
    channelListners();
  }, [isChannelsLoaded]);

  return (
    (
      channels && channels.length > 0 ?
        <div className="chat-channels">
          <h6 className="space-between">
            <span>Channels ({channels.length})</span>
            <i className="bi bi-plus-square-fill" data-bs-toggle="modal" data-bs-target="#channelModal"></i>
            {/* <button type="button" className="btn btn-primary" ></button> */}
          </h6>
          <ul className="row channel-list">
            {
              channels.length > 0 && channels.map(channel => (
                <li className={channel.id === activeChannel ? 'active': ''}
                  key={channel.id}
                  onClick={() => changeChannel(channel)}
                > #{channel.name} </li>
              ))
            }
          </ul>
          {/* Add channel modal */}
          <div className="modal fade" tabIndex="-1" id="channelModal" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Chennel</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Channel name" onChange={handleChange} name="channelName" value={channelName} />
                    <input type="text" placeholder="About the channel" onChange={handleChange} name="channelDesc" value={channelDesc} />
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      : 'loading...'
    )
  )
}

export default connect(null, { setCurrentChannel })(Channels);