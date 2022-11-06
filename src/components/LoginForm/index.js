import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-sub-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="input-container">
            <h1 className="heading">Welcome Back!</h1>
            <form className="form-container" onSubmit={this.submitForm}>
              <label className="label" htmlFor="user">
                User ID
              </label>
              <input
                type="text"
                className="input"
                id="user"
                onChange={this.onChangeUsername}
                placeholder="Enter user id"
                value={username}
              />
              <label className="label" htmlFor="password">
                PIN
              </label>
              <input
                type="password"
                id="password"
                onChange={this.onChangePassword}
                value={password}
                className="input"
                placeholder="Enter pin"
              />
              <button className="log-in-button" type="submit">
                Login
              </button>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
