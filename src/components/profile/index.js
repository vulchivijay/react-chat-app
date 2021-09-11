import React from 'react';
import firebase from './../../auth/Firebase';
import { connect } from 'react-redux';

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
        <div>
          Sign in as <strong>{user}</strong>
          <span onClick={this.handleSignOut} style={{ cursor: "pointer" }}>Sign out</span>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserProfile);