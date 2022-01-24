import { Link } from 'react-router-dom'

import './styles.scss'

function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Teams</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
