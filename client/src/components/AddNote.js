import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const handleClidk = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert('Your note ADDED successfully', 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className='container my-3 mx-8'>
                <h3 className='my-3'>Add a Note</h3>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input
                            type='text'
                            className='form-control'
                            id='title'
                            name='title'
                            value={note.title}
                            aria-describedby='emailHelp'
                            onChange={onChange}
                            minLength={5}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <input
                            type='text'
                            className='form-control'
                            id='description'
                            value={note.description}
                            name='description'
                            onChange={onChange}
                            minLength={5}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='tag' className='form-label'>Tag</label>
                        <input
                            type='text'
                            className='form-control'
                            id='tag'
                            value={note.tag}
                            name='tag'
                            onChange={onChange}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary custom-button' onClick={handleClidk}>
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
