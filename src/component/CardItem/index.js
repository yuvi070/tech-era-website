import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CardItem extends Component {
  state = {
    apiStatus: apiConstant.initial,
    courseDetail: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConstant.loading})
    console.log('loading')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        courseDetail: data.course_details,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  onClickFailureButton = () => {
    this.getCourseDetails()
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
    const {courseDetail} = this.state
    return (
      <div className="card-item-main-div">
        <div className="card-item-card">
          <img
            className="card-item-image"
            src={courseDetail.image_url}
            alt=""
          />
          <div className="card-item-card-div">
            <h1 className="card-item-main-head">{courseDetail.name}</h1>
            <p className="card-item-para">{courseDetail.description}</p>
          </div>
        </div>
      </div>
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
    const {courseDetail} = this.state
    return (
      <>
        <Header />
        {this.renderAllView()}
      </>
    )
  }
}

export default CardItem
