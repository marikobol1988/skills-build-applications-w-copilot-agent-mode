import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank', render: (entry) => `#${entry.rank}` },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

function Leaderboard() {
  return <CollectionPage title="Leaderboard" eyebrow="TEAM STANDINGS" endpoint="leaderboard" columns={columns} />
}

export default Leaderboard