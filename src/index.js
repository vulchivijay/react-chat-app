import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import firebase from 'firebase';
import store from './redux/store';
import { Provider, connect } from 'react-redux';
import { setUser, clearUser } from './redux/actions';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import './index.css';

import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

import App from './App';
import Register from './auth/register';
import Login from './auth/login';

// window.store = store;

function Root (props) {

  useEffect(() => {
    console.log('index');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.setUser(user);
        props.history.push('./');
      } else {
        props.history.push('/login');
        props.clearUser();
      }
    });
  }, []);

  return props.isLoading ? (<p>Loading</p>) : (
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
  );

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
