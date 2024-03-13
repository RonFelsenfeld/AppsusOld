const { useState, useEffect } = React


import { NotePreview } from "../cmps/NotePreview.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"

import { noteService } from "../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])


    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
            })
    }


    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
                // showErrorMsg(`Could not remove (${noteId})`)
            })
    }


    if (!notes) return <div>no notes to show..</div>
    return <div className="notes-index">
        {/* <NoteFilter /> */}
        <AddNote />
        <ul className="note-index clean-list flex wrap space-around">
            {
                notes.map(note => <li key={note.id}>
                    <NotePreview
                        note={note}
                        onRemoveNote={onRemoveNote}
                    />
                </li>)
            }
        </ul>
    </div>
}
