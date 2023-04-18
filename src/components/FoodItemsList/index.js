import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import swal from 'sweetalert'
import './index.css'

const cartListData = []

class FoodItemsList extends Component {
  state = {
    quantity: 1,
    cartList: cartListData,
  }

  onClickDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  onClickIncrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onClickAddItem = () => {
    const {cartList, quantity} = this.state
    const {foodItemDetails} = this.props
    cartListData.push({...foodItemDetails, quantity})
    this.setState({cartList: cartListData})
    localStorage.setItem('cartData', JSON.stringify(cartList))
    swal('Hurray!', 'You have added to cart successfully!', 'success')
  }

  renderFoodItemDetailsView = () => {
    const {quantity} = this.state
    const {foodItemDetails} = this.props
    const {imageUrl, name, cost, rating} = foodItemDetails
    return (
      <li className="item">
        <img className="food-item-img" src={imageUrl} alt="" />
        <div className="food-details-container">
          <h1 className="food-head">{name}</h1>
          <div className="cost-container">
            <BiRupee className="rupee-icon" />
            <p className="cost">{cost}</p>
          </div>
          <div className="ratings-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
          <div className="qty-container">
            <button
              onClick={this.onClickDecrementQuantity}
              type="button"
              className="qty-btn"
            >
              <BsDashSquare />
            </button>
            <p className="qty">{quantity}</p>
            <button
              onClick={this.onClickIncrementQuantity}
              type="button"
              className="qty-btn"
            >
              <BsPlusSquare />
            </button>
          </div>
          <button
            onClick={this.onClickAddItem}
            type="button"
            className="add-btn"
          >
            Add
          </button>
        </div>
      </li>
    )
  }

  render() {
    return <div>{this.renderFoodItemDetailsView()}</div>
  }
}
export default FoodItemsList
