import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FoodItemsList from '../FoodItemsList'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantItemDetails extends Component {
  state = {
    restaurantItemDetails: {},
    foodItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantItemDetails()
  }

  getRestaurantItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        itemsCount: fetchedData.items_count,
        location: fetchedData.location,
        name: fetchedData.name,
        opensAt: fetchedData.opens_at,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
        foodItems: fetchedData.food_items.map(eachItem => ({
          cost: eachItem.cost,
          foodType: eachItem.food_type,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          name: eachItem.name,
          rating: eachItem.rating,
        })),
      }
      this.setState({
        restaurantItemDetails: updatedData,
        foodItems: updatedData.foodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="offer-details-loader-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getRestaurantItemDetails()
  }

  renderFailureView = () => (
    <div className="restaurant-details-error-view-container-2">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="restaurants-not-found-heading">Food Items Not Found</h1>
      <button onClick={this.onClickRetry} type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderRestaurantItemDetails = () => {
    const {restaurantItemDetails, foodItems} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantItemDetails
    return (
      <div className="food-item-container">
        <div className="restaurant-details-banner-container">
          <img className="item-banner-img" src={imageUrl} alt="restaurant" />
          <div className="res-details-banner">
            <h1 className="res-name-banner">{name}</h1>
            <p className="res-food-desc-banner">{cuisine}</p>
            <p className="res-location-banner">{location}</p>
            <div className="res-rating-banner-container">
              <div className="res-rating-container-main-banner">
                <div className="res-rating-details-banner">
                  <AiFillStar className="star-res-banner" />
                  <p className="rating-res-banner">{rating}</p>
                </div>
                <p className="reviews-count-banner">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="line-res-banner" />
              <div className="price-container-main-banner">
                <div className="price-container-banner">
                  <BiRupee className="rupee-icon-banner" />
                  <p className="const-for-two-banner">{costForTwo}</p>
                </div>
                <p className="cost-for-tow-desc">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="food-items-container">
          <ul className="food-items-list-container">
            {foodItems.map(eachItem => (
              <FoodItemsList foodItemDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default RestaurantItemDetails
