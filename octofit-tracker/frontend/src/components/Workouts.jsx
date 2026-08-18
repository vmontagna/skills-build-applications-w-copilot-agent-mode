import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.results ?? payload?.items ?? payload?.data ?? []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setWorkouts(normalizeResponse(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [endpoint])

  if (status === 'loading') {
    return <p className="text-body-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load workouts: {error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Plans</p>
        <h2>Workouts</h2>
      </div>
      <div className="workout-list">
        {workouts.map((workout) => (
          <article className="workout-card" key={workout._id ?? workout.title}>
            <div>
              <h3>{workout.title}</h3>
              <p>{workout.targetGoal}</p>
            </div>
            <span>{workout.difficulty}</span>
            <small>{workout.durationMinutes} minutes</small>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
