import Profile from './components/profile';
import ChannelList from './components/chatspanel/channelList';
import ChatWindow from './components/chatswindow/chatwindow';

import './App.css';

function App() {
  return (
    <div className="app-container container-fluid">
      <header>
        <div className="row">
          <div className="col-md-12 space-between">
            <h1 className="logo">Logo</h1>
            <Profile />
          </div>
        </div>
      </header>
      <div className="app-content row">
        <div className="col-md-2 chat-left-panel">
          <ChannelList />
        </div>
        <div className="col-md-10 chat-right-panel">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;
