const { useState } = React

import { EditNote } from "./EditNote.jsx"

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [noteStyle, setNoteStyle] = useState({ backgroundColor: note.style.backgroundColor })
    const [isEditing, setIsEditing] = useState(false)
    // const [isPinned, setIsPinned] = useState(false)
    console.log(isEditing);

    function onChangeStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }




    return <article onClick={() => setIsEditing(prevIsEd => true)} style={noteStyle} className="note-preview flex space-between column">
        <h2>{note.info.title}</h2>
        <h2>{note.info.txt}</h2>

        <div className="note-actions flex space-around">
            <button>color</button>
            <button>img</button>
            <button>arcive</button>
            <button>copy</button>
            <button>email</button>
            <button className="note-remove-btn" onClick={() => { onRemoveNote(note.id) }}>x</button>
        </div>



        {isEditing && <EditNote
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onUpdateNote={onUpdateNote}
            noteId={note.id} />}
    </article>


}