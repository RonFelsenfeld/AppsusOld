const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter
// const { Outlet, useOutletContext } = ReactRouterDOM

import { noteService } from "../../note/services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function EditNote({ noteId, onUpdateNote, isEditing, setIsEditing }) {
    const [noteToEdit, setNoteToEdit] = useState(null)
    // const { noteId } = useParams()
    const navigate = useNavigate()
    // const [onUpdateNote] = useOutletContext()
    // console.log(loadNotes)



    useEffect(() => {
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then(note => setNoteToEdit(note))
            .catch(err => {
                console.log(err);
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then((savedNote) => {
                // onEditNote()
                onUpdateNote(savedNote)
                setIsEditing((isEditing) => false)
                // navigate('/note')
            })
    }


    if (!noteToEdit) return <h1>loading...</h1>
    const title = noteToEdit.info.title
    const txt = noteToEdit.info.txt

    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
                <label htmlFor="save"></label>
                <input

                    type="text"
                    id="save"
                    name="title"
                    onChange={handleChange}
                    value={title}
                />
                <input
                    placeholder="Note text.."
                    type="text"
                    id="txt"
                    name="txt"
                    onChange={handleChange}
                    value={txt}
                />

                <button>add</button>
            </form>
        </section>
    )
}