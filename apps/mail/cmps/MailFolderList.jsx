const { useState, useEffect } = React
const { NavLink } = ReactRouterDOM

export function MailFolderList({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  return (
    <section className="folder-list">
      <button className="btn-compose">Compose</button>

      <div className="folder-container flex column">
        <NavLink to="/mail/inbox">
          <button
            className="btn-folder"
            onClick={() => setFilterByToEdit({ folder: 'inbox' })}
          >
            Inbox
          </button>
        </NavLink>

        <NavLink to="/mail/sent">
          <button
            className="btn-folder"
            onClick={() => setFilterByToEdit({ folder: 'sent' })}
          >
            Sent
          </button>
        </NavLink>

        <NavLink to="/mail/trash">
          <button
            className="btn-folder"
            onClick={() => setFilterByToEdit({ folder: 'trash' })}
          >
            Trash
          </button>
        </NavLink>

        <NavLink to="/mail/draft">
          <button
            className="btn-folder"
            onClick={() => setFilterByToEdit({ folder: 'draft' })}
          >
            Draft
          </button>
        </NavLink>
      </div>
    </section>
  )
}
