import React from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';

import './form.css';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    errors: [],
    loading: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        this.setState({ loading: false })
      })
      .catch(error => {
        this.setState({ errors: this.state.errors.concat(error), loading: false })
      })
    }
  }

  isFormValid = ({email, password}) => email && password

  render() {
    const {email, password, errors, loading} = this.state;

    return (
      <div className="login-page container-fluid">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="form-sign-in">
              <form onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                  <input type="email" className="form-control" placeholder="name@example.com" onChange={this.handleChange} name="email" value={email} />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange} name="password" value={password} />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  {
                    loading ?
                      (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                    :
                    "Sign in"
                  }
                </button>
                {
                  this.state.errors.length > 0 && (
                    <p className="mt-3 text-danger">{errors[0].message}</p>
                  )
                }
                <p className="mt-3">Do not have an account? <Link to='/register'>sign up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;