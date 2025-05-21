import { FaBehance, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import '../styles/SocialLinks.css'

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <FaGithub className="icon" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="icon" />
      </a>
      <a href="https://behance.com" target="_blank" rel="noopener noreferrer">
        <FaBehance className="icon" />
      </a>
    </div>
  )
}

export default SocialLinks