import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-4'>
            <div className='card my-3'>
                <div className='card-body'>
                    <h5 className='card-title'>{note.title}</h5>
                    <p className='card-text'>{note.description}</p>
                    <div className='note-icons'>
                        <button className='btn btn-danger btn-sm mx-2' onClick={() => { deleteNote(note._id); props.showAlert('Your note DELETED successfully...', 'danger'); }}>
                            <i className='fa fa-trash'></i> Delete
                        </button>
                        <button className='btn btn-primary btn-sm mx-2' onClick={() => { updateNote(note); }}>
                            <i className='fa fa-pencil'></i> Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
