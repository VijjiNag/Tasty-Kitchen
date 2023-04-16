import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantsHeader = props => {
  const {sortByOptions, activeOptionId} = props

  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  return (
    <div className="filter-price-container">
      <BsFilterLeft className="filter-icon" />
      <select
        className="sort-by-select"
        value={activeOptionId}
        onChange={onChangeSortby}
      >
        {sortByOptions.map(eachOption => (
          <option key={eachOption.id} value={eachOption.value}>
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RestaurantsHeader
