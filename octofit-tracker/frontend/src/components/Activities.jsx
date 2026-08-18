import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.results ?? payload?.items ?? payload?.data ?? []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setActivities(normalizeResponse(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [endpoint])

  if (status === 'loading') {
    return <p className="text-body-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load activities: {error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Training Log</p>
        <h2>Activities</h2>
      </div>
      <div className="activity-grid">
        {activities.map((activity) => (
          <article className="activity-card" key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
            <div>
              <h3>{activity.activityType}</h3>
              <p>{activity.username}</p>
            </div>
            <dl>
              <div>
                <dt>Minutes</dt>
                <dd>{activity.durationMinutes}</dd>
              </div>
              <div>
                <dt>Calories</dt>
                <dd>{activity.caloriesBurned}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
