import {Link} from 'react-router-dom'

import {HeaderDiv, Image} from './styled'

const Header = () => (
  <HeaderDiv>
    <Link to="/">
      <Image
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </HeaderDiv>
)

export default Header
