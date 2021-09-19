import Profile from './components/profile';
import ChatsList from './components/chatspanel/chatsList';
import ChatWindow from './components/chatswindow/chatwindow';

import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Profile />
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 chat-left-panel">
          <ChatsList />
        </div>
        <div className="col-md-10 chat-right-panel">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;
