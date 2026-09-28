import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'motto', label: 'Motto' },
  { key: 'members', label: 'Members', render: (team) => `${team.members?.length ?? 0} members` },
  { key: 'points', label: 'Points' },
]

function Teams() {
  return <CollectionPage title="Teams" eyebrow="MOVE TOGETHER" endpoint="teams" columns={columns} />
}

export default Teams