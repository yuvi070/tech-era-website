import {Link} from 'react-router-dom'
import {List, Image, Para} from './styled'

import './index.css'

const CourseCard = props => {
  const {each} = props
  return (
    <List>
      <Link to={`/courses/${each.id}`} className="link-text">
        <Image src={each.logo_url} alt="" />
        <Para>{each.name}</Para>
      </Link>
    </List>
  )
}

export default CourseCard
