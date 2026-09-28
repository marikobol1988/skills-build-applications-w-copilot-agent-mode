import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
]

function Users() {
  return <CollectionPage title="Members" eyebrow="OCTOFIT COMMUNITY" endpoint="users" columns={columns} />
}

export default Users