import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        category: ''
    });

    const history = useHistory();

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value});
    }

    const createNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const {title, content, category} = note;
                const newNote = {title, content, category};

                await axios.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                });

                return history.push('/');
            }
        } catch (err) {
            window.location.href = "/";
        }
    }
    
    return (
        <div className="create-note">
            <h2>Create Note</h2>
            <form onSubmit={createNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} id="title" name="title" required onChange={onChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={note.content} id="content" name="content" required row="10" onChange={onChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="category">Category</label>
                    <input type="text" value={note.category} id="category" name="category" required onChange={onChangeInput} />
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}