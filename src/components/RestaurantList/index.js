import {Component} from 'react'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import RestaurantsHeader from '../RestaurantsHeader'
import RestaurantsListItem from '../RestaurantsListItem'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantList extends Component {
  state = {
    activeOptionId: sortByOptions[0].value,
    restaurantsList: [],
    activePageNumber: 1,
    activePage: 1,
    limit: 9,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const {activeOptionId, searchInput, limit, activePage} = this.state
    const offset = (activePage - 1) * limit
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${activeOptionId}&search=${searchInput}&offset=${offset}&limit=${limit}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachList => ({
        costForTwo: eachList.cost_for_two,
        cuisine: eachList.cuisine,
        groupByTime: eachList.group_by_time,
        hasOnlineDelivery: eachList.has_online_delivery,
        hasTableBooking: eachList.has_table_booking,
        id: eachList.id,
        imageUrl: eachList.image_url,
        isDeliveringNow: eachList.is_delivering_now,
        location: eachList.location,
        menuType: eachList.menu_type,
        name: eachList.name,
        opensAt: eachList.opens_at,
        userRating: {
          rating: eachList.user_rating.rating,
          ratingColor: eachList.user_rating.rating_color,
          ratingText: eachList.user_rating.rating_text,
          totalReviews: eachList.user_rating.total_reviews,
        },
        total: fetchedData.total,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getRestaurantsList)
    this.renderSearchResults()
  }

  renderSearchResults = () => {
    const {restaurantsList, searchInput} = this.state
    const searchResults = restaurantsList.filter(eachList =>
      eachList.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({restaurantsList: searchResults})
  }

  renderFilterView = () => {
    const {activeOptionId, searchInput} = this.state
    return (
      <div className="res-filter-container">
        <div className="res-head-container">
          <div className="res-head">
            <h1 className="popular-head">Popular Restaurants</h1>
            <p className="desc">
              Select your favorite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="filter-container">
            <input
              onChange={this.onChangeSearchInput}
              value={searchInput}
              className="search-input"
              type="search"
              placeholder="Search"
            />
            <RestaurantsHeader
              activeOptionId={activeOptionId}
              sortByOptions={sortByOptions}
              changeSortby={this.changeSortby}
            />
          </div>
        </div>
        <hr className="line" />
      </div>
    )
  }

  onDecrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
          activePageNumber: prevState.activePageNumber - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onIncrementPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
          activePageNumber: prevState.activePageNumber + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  renderLoadingView = () => (
    <div
      className="offer-details-loader-container"
      data-testid="restaurants-list-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getRestaurantsList()
  }

  renderFailureView = () => (
    <div className="restaurant-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="restaurants-not-found-heading">Restaurants Not Found</h1>
      <button onClick={this.onClickRetry} type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderRestaurantsView = () => {
    const {restaurantsList, activePageNumber} = this.state
    return (
      <>
        <div className="render-filters">
          <ul data-testid="restaurant-item" className="res-list-container">
            {restaurantsList.map(eachList => (
              <RestaurantsListItem
                restaurantsListDetails={eachList}
                key={eachList.id}
              />
            ))}
          </ul>
          <div className="page-container">
            <button
              data-testid="pagination-left-button"
              onClick={this.onDecrementPage}
              type="button"
              className="page-decrement"
            >
              <IoIosArrowDropleftCircle className="icon" />
            </button>
            <p className="pagination">
              <span data-testid="active-page-number">{activePageNumber}</span>{' '}
              of 4
            </p>
            <button
              data-testid="pagination-right-button"
              onClick={this.onIncrementPage}
              type="button"
              className="page-decrement"
            >
              <IoIosArrowDroprightCircle className="icon" />
            </button>
          </div>
        </div>
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsView()
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
      <div className="res-container">
        {this.renderFilterView()}
        {this.renderApiStatusView()}
      </div>
    )
  }
}
export default RestaurantList
