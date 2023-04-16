import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <img
      src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681480139/erroring_1_sk0s9b.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found
    </p>
    <p className="not-found-desc">Please go back to the homepage.</p>
    <Link className="btn-link" to="/">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
