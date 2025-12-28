import { APP_TITLE, USER_NAME } from '../../../constants'
import './Header.css'

export default function Header() {
  return (
    <header className="shell-header">
      <div className="header-content">
        <h1>🛫 {APP_TITLE}</h1>
        <div className="header-actions">
          <span className="user-info">{USER_NAME}</span>
        </div>
      </div>
    </header>
  )
}
