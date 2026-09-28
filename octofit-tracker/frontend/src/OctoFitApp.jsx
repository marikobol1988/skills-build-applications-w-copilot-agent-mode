import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import { apiBaseUrl } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Members', path: '/users' },
]

function Overview() {
  return (
    <>
      <section className="welcome-section">
        <div className="eyebrow">YOUR NEXT REP STARTS HERE</div>
        <h1>Make today<br /><span>count.</span></h1>
        <p>Your movement, your people, your pace. Let&apos;s get into it.</p>
        <NavLink className="btn btn-dark start-button" to="/activities">
          Log an activity <span aria-hidden="true">↗</span>
        </NavLink>
        <div className="welcome-mark" aria-hidden="true">O</div>
      </section>

      <section className="overview-section" aria-labelledby="overview-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">YOUR SNAPSHOT</div>
            <h2 id="overview-title">This week</h2>
          </div>
          <span className="date-range">WEEK 01 <span> / </span> TODAY</span>
        </div>
        <div className="row g-0 metric-row">
          <article className="col-12 col-md-4 metric">
            <span className="metric-label">ACTIVE MINUTES</span>
            <strong>--<small> min</small></strong>
            <span className="metric-note">Your movement adds up</span>
          </article>
          <article className="col-12 col-md-4 metric">
            <span className="metric-label">ACTIVITIES</span>
            <strong>--</strong>
            <span className="metric-note">Every session counts</span>
          </article>
          <article className="col-12 col-md-4 metric">
            <span className="metric-label">TEAM RANK</span>
            <strong>--<small> / --</small></strong>
            <span className="metric-note">Move up together</span>
          </article>
        </div>
      </section>
    </>
  )
}

function OctoFitApp() {
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json()
      })
      .then((health) => setApiStatus(health.database === 'connected' ? 'connected' : 'database offline'))
      .catch((error) => {
        if (error.name !== 'AbortError') setApiStatus('offline')
      })

    return () => controller.abort()
  }, [])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit home">
          <img src={logo} alt="" />
          <span>octofit</span>
        </NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="nav flex-column" aria-label="Main navigation">
          {sections.map((section, index) => (
            <NavLink
              key={section.path}
              to={section.path}
              end={section.path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
              {section.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">MOVE WITH INTENTION</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>PERSONAL TRAINING SPACE</span>
          <span className={`connection-status ${apiStatus === 'connected' ? 'is-online' : ''}`}>
            <span className="status-dot" /> API {apiStatus}
          </span>
        </header>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default OctoFitApp