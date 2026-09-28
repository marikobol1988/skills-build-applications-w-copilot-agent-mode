import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'durationMinutes', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  { key: 'difficulty', label: 'Level' },
]

function Workouts() {
  return <CollectionPage title="Workouts" eyebrow="TRAINING LIBRARY" endpoint="workouts" columns={columns} />
}

export default Workouts