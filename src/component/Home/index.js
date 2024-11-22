import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import {LoaderDiv, HomeDiv} from './styled'

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
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({courseList: data.courses})
    } else {
      console.log('Error')
    }
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

  renderFailure = () => (
    <LoaderDiv>
      <Loader />
    </LoaderDiv>
  )

  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default Home
