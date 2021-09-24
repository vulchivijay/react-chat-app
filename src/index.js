import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { Provider, connect } from 'react-redux';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import './index.css';

import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

import App from './App';
import Register from './auth/register';
import Login from './auth/login';
import store from './redux/store';
import { setUser, clearUser } from './redux/actions';

window.store = store;
// const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('./');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    })
  }

  render () {
    return this.props.isLoading ? (<p>Loading</p>) : (
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
