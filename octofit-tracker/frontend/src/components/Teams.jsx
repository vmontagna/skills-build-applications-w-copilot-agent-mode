import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.results ?? payload?.items ?? payload?.data ?? []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setTeams(normalizeResponse(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [endpoint])

  if (status === 'loading') {
    return <p className="text-body-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load teams: {error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </div>
      <div className="team-grid">
        {teams.map((team) => (
          <article className="team-card" key={team._id ?? team.name}>
            <span>{team.mascot}</span>
            <h3>{team.name}</h3>
            <p>{team.city}</p>
            <strong>{team.memberCount} members</strong>
            <small>{team.weeklyGoalMinutes} weekly goal minutes</small>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
