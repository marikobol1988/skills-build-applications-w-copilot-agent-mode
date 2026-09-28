import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'durationMinutes', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  { key: 'difficulty', label: 'Level' },
]

function Workouts() {
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
      title="Workouts"
      eyebrow="TRAINING LIBRARY"
      endpoint="workouts"
      columns={columns}
      state={state}
      onRetry={() => setAttempt((value) => value + 1)}
    />
  )
}

export default Workouts