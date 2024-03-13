const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailFolderList({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  return (
    <section className="folder-list">
      <button className="btn-compose">Compose</button>

      <div className="folder-container flex column">
        <button
          className="btn-folder"
          onClick={() => setFilterByToEdit({ folder: 'inbox' })}
        >
          Inbox
        </button>

        <button
          className="btn-folder"
          onClick={() => setFilterByToEdit({ folder: 'sent' })}
        >
          Sent
        </button>

        <button
          className="btn-folder"
          onClick={() => setFilterByToEdit({ folder: 'trash' })}
        >
          Trash
        </button>

        <button
          className="btn-folder"
          onClick={() => setFilterByToEdit({ folder: 'draft' })}
        >
          Draft
        </button>
      </div>
    </section>
  )
}
