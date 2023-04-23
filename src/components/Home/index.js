import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import RestaurantList from '../RestaurantList'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    offersList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOfferDetails()
  }

  getOfferDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(eachOffer => ({
        imageUrl: eachOffer.image_url,
        id: eachOffer.id,
      }))
      this.setState({
        offersList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div
      testid="restaurants-offers-loader"
      className="offer-details-loader-container"
    >
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderOffersView = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    const {offersList} = this.state
    return (
      <>
        <div className="home-container">
          <Slider {...settings}>
            {offersList.map(eachOffer => (
              <ul className="slick-slide">
                <li key={eachOffer.id}>
                  <img
                    className="image-offer"
                    src={eachOffer.imageUrl}
                    alt="offer"
                  />
                </li>
              </ul>
            ))}
          </Slider>
          <div className="restaurant-container">
            <RestaurantList />
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOffersView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderApiStatusView()}
      </>
    )
  }
}

export default Home
