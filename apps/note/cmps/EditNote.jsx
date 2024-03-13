const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Outlet } = ReactRouterDOM

import { noteService } from "../../note/services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function EditNote() {
    const [noteToEdit, setNoteToEdit] = useState(null)
    const { noteId } = useParams()
    console.log(noteToEdit);

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
        // console.log(target);
        setNoteToEdit((prevNote) => ({ ...prevNote, [field]: value }))
        console.log('noteToEDit',noteToEdit);
    }

    function onSaveNote() {
        console.log('hi');
    }
if(!noteToEdit) return <h1>loading...</h1>
    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
                <label htmlFor="save"></label>
                <input

                    type="text"
                    id="save"
                    name="title"
                    onChange={handleChange}
                    value={noteToEdit.info.title}
                />
                <input
                    placeholder="Note text.."
                    type="text"
                    id="txt"
                    name="txt"
                    onChange={handleChange}
                    value={noteToEdit.info.txt}
                />

                <button>add</button>
            </form>
        </section>
    )
}