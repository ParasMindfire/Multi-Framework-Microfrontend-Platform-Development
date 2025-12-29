import './Home.css'
import { FEATURE_CARDS, HOME_TEXT } from '../../constants'

export default function Home() {
  return (
    <div className="home-container">
      <h2>{HOME_TEXT.TITLE}</h2>
      <p>{HOME_TEXT.SUBTITLE}</p>

      <div className="feature-grid">
        {FEATURE_CARDS.map((card, index) => (
          <div key={index} className="feature-card">
            <span className="feature-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
