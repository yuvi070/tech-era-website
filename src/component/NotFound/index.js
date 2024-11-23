import Header from '../Header'

import {NotFoundDiv, Image, Heading, Para} from './styled'

const NotFound = () => (
  <>
    <Header />
    <NotFoundDiv>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <Heading>Page Not Found</Heading>
      <Para>We are sorry, the page you requested could not be found.</Para>
    </NotFoundDiv>
  </>
)

export default NotFound
