import Profile from './components/profile';

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
        <div className="col-md-2">
          aside panel
        </div>
        <div className="col-md-10">
          messages
        </div>
      </div>
    </div>
  );
}

export default App;
