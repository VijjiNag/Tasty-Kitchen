import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

const RestaurantsListItem = props => {
  const {restaurantsListDetails} = props
  const {imageUrl, cuisine, name, userRating, id} = restaurantsListDetails
  const {rating, totalReviews} = userRating
  return (
    <li className="res-list">
      <Link to={`/restaurant/${id}`} className="res-link">
        <img className="res-img" src={imageUrl} alt="" />
        <div className="res-details">
          <h1 className="hotel-name">{name}</h1>
          <p className="food-type">{cuisine}</p>
          <div className="ratings-container">
            <AiFillStar className="star" />
            <p className="rating">
              {rating}{' '}
              <span className="total-reviews">{`(${totalReviews} ratings)`}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default RestaurantsListItem
