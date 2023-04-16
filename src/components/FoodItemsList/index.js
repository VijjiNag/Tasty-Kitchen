import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import swal from 'sweetalert'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodItemsList extends Component {
  state = {
    quantity: 1,
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

  renderFoodItemDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {foodItemDetails} = this.props
        const {quantity} = this.state
        const {cost, imageUrl, name, rating} = foodItemDetails
        const {addCartItem} = value
        const onClickAddItem = () => {
          addCartItem({...foodItemDetails, quantity})
          swal('Hurray!', 'You have added to cart successfully!', 'success')
        }
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
                onClick={onClickAddItem}
                type="button"
                className="add-btn"
              >
                Add
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderFoodItemDetailsView()}</div>
  }
}
export default FoodItemsList
