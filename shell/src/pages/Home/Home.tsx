import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to SkyCart Operations Platform</h2>
      <p>Select a module from the navigation to get started.</p>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Flight Dashboard</h3>
          <p>View and manage flight schedules, filter and sort operations</p>
        </div>

        <div className="feature-card">
          <h3>Crew Management</h3>
          <p>Assign crew members to flights and manage assignments</p>
        </div>

        <div className="feature-card">
          <h3>Inventory</h3>
          <p>Track galley items and manage in-flight inventory</p>
        </div>

        <div className="feature-card">
          <h3>Analytics</h3>
          <p>View real-time charts and operational insights</p>
        </div>
      </div>
    </div>
  )
}
