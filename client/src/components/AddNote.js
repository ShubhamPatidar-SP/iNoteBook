import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert('Your note ADDED successfully', 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-1">
                <div className="col-md-6">
                    <div className="card signup-container">
                        <div className="card-body">
                            <h3 className="card-title text-center">Add a Note</h3>
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={note.title}
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        minLength="5"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={note.description}
                                        name="description"
                                        onChange={onChange}
                                        minLength="5"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tag"
                                        value={note.tag}
                                        name="tag"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary custom-button" onClick={handleClick}>
                                        Add Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
