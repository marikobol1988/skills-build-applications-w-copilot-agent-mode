import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
]

function Users() {
  const [state, setState] = useState({ status: 'loading', records: [], error: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetch(apiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        return response.json()
      })
      .then((payload) => setState({ status: 'ready', records: normalizeCollectionResponse(payload), error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', records: [], error: error.message })
      })

    return () => controller.abort()
  }, [attempt])

  return (
    <CollectionPage
      title="Members"
      eyebrow="OCTOFIT COMMUNITY"
      endpoint="users"
      columns={columns}
      state={state}
      onRetry={() => setAttempt((value) => value + 1)}
    />
  )
}

export default Users