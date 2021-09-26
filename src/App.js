import React from 'react';
import { connect } from 'react-redux';

import Profile from './components/profile';
import ChannelPanel from './components/chatspanel/channelpanel';
import ChatWindow from './components/chatswindow/chatwindow';

import './App.css';

const App = ({currentUser, currentChannel}) => {
  return (
    <div className="app-container">
      <header>
        <div className="row">
          <div className="col-md-12 space-between">
            <h1 className="logo">Let's talk, <span className="user-name">{currentUser.displayName }</span></h1>
            <Profile userProfile={currentUser} />
          </div>
        </div>
      </header>
      <div className="app-content container-fluid">
        <div className="row">
          <div className="col-md-3 chat-panel">
            <ChannelPanel
              key={currentUser && currentUser.uid}
              userProfile={currentUser}
            />
          </div>
          <div className="col-md-9 chat-content">
            <ChatWindow
              key={currentChannel && currentChannel.id}
              currentChannel={currentChannel}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
})

export default connect(mapStateToProps)(App);
