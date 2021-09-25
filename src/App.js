import React from 'react';
import { connect } from 'react-redux';

import Profile from './components/profile';
import ChannelList from './components/chatspanel/channelList';
import ChatWindow from './components/chatswindow/chatwindow';

import './App.css';

const App = ({currentUser, currentChannel}) => {
  return (
    <div className="app-container container-fluid">
      <header>
        <div className="row">
          <div className="col-md-12 space-between">
            <h1 className="logo">Logo</h1>
            <Profile userProfile={currentUser} />
          </div>
        </div>
      </header>
      <div className="app-content row">
        <div className="col-md-2 chat-left-panel">
          <ChannelList
            key={currentUser && currentUser.uid}
            userProfile={currentUser}
          />
        </div>
        <div className="col-md-10 chat-right-panel">
          <ChatWindow
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
})

export default connect(mapStateToProps)(App);
