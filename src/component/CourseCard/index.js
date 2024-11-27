import {Link} from 'react-router-dom'

import './index.css'

const CourseCard = props => {
  const {each} = props
  return (
    <li className="course-card-list">
      <Link to={`/courses/${each.id}`} className="link-text">
        <img className="course-card-image" src={each.logo_url} alt="" />
        <p className="course-card-para">{each.name}</p>
      </Link>
    </li>
  )
}

export default CourseCard
