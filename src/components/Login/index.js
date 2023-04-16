import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
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
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          className="mobile-view-banner"
          src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681207620/Rectangle_1457_vqyzwy.png"
          alt=""
        />
        <div className="login-card-container">
          <div className="login-card">
            <div className="logo-container">
              <img
                className="logo"
                src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681293595/Vector_klhk0p.png"
                alt="website login"
              />
              <h1 className="website-head">Tasty Kitchens</h1>
              <h1 className="login-head">Login</h1>
            </div>
            <form className="login-form-container" onSubmit={this.onSubmitForm}>
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUsername}
                value={username}
                id="username"
                className="input"
                type="text"
                placeholder="USERNAME"
              />
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                value={password}
                id="password"
                className="input"
                type="password"
                placeholder="PASSWORD"
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
        <img
          className="login-banner-img"
          src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681207588/367d1981f2a409a617ac848670d29c7e_s14uml.jpg"
          alt=""
        />
      </div>
    )
  }
}
export default Login
