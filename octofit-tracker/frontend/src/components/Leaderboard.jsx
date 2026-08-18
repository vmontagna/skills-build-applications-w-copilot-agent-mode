import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.results ?? payload?.items ?? payload?.data ?? []
}

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setLeaders(normalizeResponse(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [endpoint])

  if (status === 'loading') {
    return <p className="text-body-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load leaderboard: {error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <ol className="leader-list">
        {leaders.map((leader) => (
          <li key={leader._id ?? leader.username}>
            <span className="rank">#{leader.rank}</span>
            <span>
              <strong>{leader.username}</strong>
              <small>{leader.teamName}</small>
            </span>
            <span>{leader.points} pts</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
