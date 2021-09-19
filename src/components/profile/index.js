import React from 'react';
import firebase from './../../auth/Firebase';
import { connect } from 'react-redux';

import './index.css';

class UserProfile extends React.Component {

  state = {
    user: null
  }

  componentDidMount() {
    this.setState({user: this.props.currentUser.displayName });
  }
  handleSignOut = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    })
  }

  render () {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <h1 className="logo">Logo</h1>
          <div className="user-profile">
            Sign in as <strong>{user}</strong>
            <span onClick={this.handleSignOut} className="sign-out">Sign out</span>
          </div>
        </header>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserProfile);