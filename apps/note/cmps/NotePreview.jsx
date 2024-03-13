const { useState } = React

export function NotePreview({ note, onRemoveNote }) {
    const [noteStyle, setNoteStyle] = useState({ backgroundColor: note.style.backgroundColor })
    const [isPinned, setIsPinned] = useState(false)


    return <article style={noteStyle} className="note-preview flex space-between column">
        <h2>{note.info.title}</h2>
        <h2>{note.info.txt}</h2>

        <div className="note-actions flex space-around">
            <button>color</button>
            <button>img</button>
            <button>arcive</button>
            <button>copy</button>
            <button className="note-remove-btn" onClick={() => { onRemoveNote(note.id) }}>x</button>
        </div>

    </article>
}