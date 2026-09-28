import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'motto', label: 'Motto' },
  { key: 'members', label: 'Members', render: (team) => `${team.members?.length ?? 0} members` },
  { key: 'points', label: 'Points' },
]

function Teams() {
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
      title="Teams"
      eyebrow="MOVE TOGETHER"
      endpoint="teams"
      columns={columns}
      state={state}
      onRetry={() => setAttempt((value) => value + 1)}
    />
  )
}

export default Teams