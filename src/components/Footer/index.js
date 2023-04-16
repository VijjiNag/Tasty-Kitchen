import {
  FaTwitter,
  FaFacebookSquare,
  FaPinterestSquare,
  FaInstagram,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="website-container">
      <img
        src="https://res.cloudinary.com/dhfmjj1j9/image/upload/v1681536126/Frame_275_saz2uq.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-head">Tasty Kitchens</h1>
    </div>
    <p className="footer-desc">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="social-icon" />
      <FaTwitter testid="twitter-social-icon" className="social-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="social-icon" />
    </div>
  </div>
)
export default Footer
