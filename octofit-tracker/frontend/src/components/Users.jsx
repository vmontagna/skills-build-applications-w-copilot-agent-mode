import { useEffect, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  return payload?.results ?? payload?.items ?? payload?.data ?? []
}

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setUsers(normalizeResponse(payload))
          setStatus('ready')
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [endpoint])

  if (status === 'loading') {
    return <p className="text-body-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load users: {error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      <div className="responsive-table">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.username}>
                <td>{user.displayName}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.fitnessGoal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
