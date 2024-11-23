import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import {
  MainDiv,
  Card,
  Image,
  CardDiv,
  MainHead,
  Para,
  LoaderDiv,
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
    <LoaderDiv data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderDiv>
  )

  renderSuccess = () => {
    const {courseDetail} = this.state
    return (
      <MainDiv>
        <Card>
          <Image src={courseDetail.image_url} alt="" />
          <CardDiv>
            <MainHead>{courseDetail.name}</MainHead>
            <Para>{courseDetail.description}</Para>
          </CardDiv>
        </Card>
      </MainDiv>
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
