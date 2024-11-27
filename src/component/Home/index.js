import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseCard from '../CourseCard'

import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({courseList: data.courses, apiStatus: apiConstant.success})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  onClickFailureButton = () => {
    this.getCourseList()
  }

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  renderLoading = () => (
    <div className="loader-div" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {courseList} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        <ul className="ul-container">
          {courseList.map(each => (
            <CourseCard each={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-div">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onClickFailureButton}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderAllView()}
      </>
    )
  }
}

export default Home
