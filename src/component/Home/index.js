import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseCard from '../CourseCard'

import {
  LoaderDiv,
  MainHeading,
  CourseDiv,
  FailureDiv,
  FailureImage,
  FailureHead,
  FailurePara,
  FailureButton,
} from './styled'

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
    <LoaderDiv data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderDiv>
  )

  renderSuccess = () => {
    const {courseList} = this.state
    return (
      <>
        <MainHeading>Courses</MainHeading>
        <CourseDiv as="ul">
          {courseList.map(each => (
            <CourseCard each={each} key={each.id} />
          ))}
        </CourseDiv>
      </>
    )
  }

  renderFailure = () => (
    <FailureDiv>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <FailureHead>Oops! Something Went Wrong</FailureHead>
      <FailurePara>
        We cannot seem to find the page you are looking for.
      </FailurePara>
      <FailureButton onClick={this.onClickFailureButton}>Retry</FailureButton>
    </FailureDiv>
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
