import CollectionPage from './CollectionPage.jsx'

const columns = [
  {
    key: 'date',
    label: 'Date',
    render: (activity) => new Date(activity.date).toLocaleDateString(),
  },
  { key: 'type', label: 'Activity' },
  { key: 'user', label: 'Member' },
  { key: 'durationMinutes', label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
  { key: 'caloriesBurned', label: 'Calories', render: (activity) => `${activity.caloriesBurned} kcal` },
]

function Activities() {
  return <CollectionPage title="Activities" eyebrow="MOVEMENT LOG" endpoint="activities" columns={columns} />
}

export default Activities