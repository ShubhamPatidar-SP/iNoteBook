import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = 'http://127.0.0.1:5000';
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [about, setAbout] = useState("");

    // get user details
    const getuser = async () => {
        try {
            // API CALL
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching user data: ${response.statusText}`);
            }

            const json = await response.json();
            setAbout(json);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    // get all notes
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API CALL 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {
        //API CALL 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
        });
        const json = await response.json();
        console.log(json)

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edite a note
    const editNote = async (id, title, description, tag) => {
        // API CALL 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit note in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, about, getuser }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState
