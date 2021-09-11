import React from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';
import md5 from 'md5';

import './index.css';

class Register extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: 'Fill in all fields'};
      this.setState({ errors: errors.concat(error)})
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      // throw error
      error = { message: 'Password is invalid'};
      this.setState({ errors: errors.concat(error)})
      return false;
    } else {
      // form valid
      return true;
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirm }) => {
    return !username.length || !email.length || !password.length || !passwordConfirm.length;
  }

  isPasswordValid = ({ password, passwordConfirm}) => {
    if (password.length < 6 || passwordConfirm.length < 6) {
      return false;
    } else if (password !== passwordConfirm) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        this.setState({ loading: false });
        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        })
        .then(() => {
          this.saveUser(createdUser).then(() => {
            console.log('User saved');
            this.setState({ loading: false });
          });
        })
        .catch(error => {
          this.setState({ errors: this.state.errors.concat(error), loading: false })
        })
      })
      .catch(error => {
        this.setState({ errors: this.state.errors.concat(error), loading: false})
      })
    }
  }

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }


  render() {
    const {username, email, password, passwordConfirm, errors, loading} = this.state;

    return (
      <div className="form-register">
        <form onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div className="form-floating">
            <input type="text" className="form-control" placeholder="User name" onChange={this.handleChange} name="username" value={username} />
            <label htmlFor="floatingInput">User name</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control" placeholder="name@example.com" onChange={this.handleChange} name="email" value={email} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange} name="password" value={password} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password confirm" onChange={this.handleChange} name="passwordConfirm" value={passwordConfirm} />
            <label htmlFor="floatingPasswordConfirm">Password Confirm</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            {
              loading ?
                (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
              :
              "Sign up"
            }
          </button>
          {
            this.state.errors.length > 0 && (
              <p className="mt-3 text-danger">{errors[0].message}</p>
            )
          }
          <p className="mt-3">Already a user? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    );
  }
}

export default Register;