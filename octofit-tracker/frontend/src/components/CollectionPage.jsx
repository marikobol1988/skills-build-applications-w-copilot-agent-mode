function displayValue(record, column) {
  if (column.render) return column.render(record)

  const value = record[column.key]
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') {
    return value.name || value.username || value._id || JSON.stringify(value)
  }
  return value
}

function CollectionPage({ title, eyebrow, endpoint, columns, state, onRetry }) {
  return (
    <section className="collection-page" aria-labelledby={`${endpoint}-title`}>
      <div className="eyebrow">{eyebrow}</div>
      <div className="collection-heading">
        <h1 id={`${endpoint}-title`}>{title}</h1>
        <span className="collection-count">
          {state.status === 'ready' ? `${state.records.length} records` : 'OCTOFIT TRACKER'}
        </span>
      </div>

      {state.status === 'loading' && <p className="collection-state">Loading {title.toLowerCase()}…</p>}

      {state.status === 'error' && (
        <div className="collection-error" role="alert">
          <p>Could not load {title.toLowerCase()}: {state.error}</p>
          <button className="btn btn-dark btn-sm" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}

      {state.status === 'ready' && state.records.length === 0 && (
        <p className="collection-state">No {title.toLowerCase()} yet.</p>
      )}

      {state.status === 'ready' && state.records.length > 0 && (
        <div className="table-responsive collection-table-wrap">
          <table className="table collection-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {state.records.map((record, index) => (
                <tr key={record._id || record.id || `${endpoint}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{displayValue(record, column)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage