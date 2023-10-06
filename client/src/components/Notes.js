import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    // Updating the note
    const context = useContext(noteContext);
    const navigate = useNavigate(); // Call useNavigate as a function
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/Login');
        }
        getNotes();
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClidk = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Your note UPDATED cussessfuly...", "success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control bg-dark text-white" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control bg-dark text-white" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control bg-dark text-white" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClidk} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-3'>
                <h3>Your Note</h3>
                <div className='container mx-2'>
                    {notes.length === 0 && <h5>"No notes to Display"</h5>}
                </div>
                {/* updating the note  */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes