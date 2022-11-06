import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="web-site-logo"
      />
      <button className="logout-button" type="button" onClick={onClickLogOut}>
        LogOut
      </button>
    </nav>
  )
}
export default withRouter(Header)
