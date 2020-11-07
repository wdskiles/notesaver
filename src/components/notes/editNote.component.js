import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function EditNote({match}) {
    const [note, setNote] = useState({
        title: '',
        content: '',
        category: '',
        id: ''
    });

    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const getNote = async () => {
                const token = localStorage.getItem('tokenStore');
                if (match.params.id) {
                    const res = await axios.get(`/api/notes/${match.params.id}`, {
                        headers: {Authorization: token}
                    });
                    if (mounted) {
                    setNote({
                        title: res.data.title,
                        content: res.data.content,
                        category: res.data.category,
                        id: res.data._id
                    });
                    }
                }
            }
            getNote();
        }
        return () => mounted = false;
    }, [match.params.id]);

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value});
    }

    const editNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const {title, content, category, id} = note;
                const newNote = {title, content, category};

                await axios.put(`/api/notes/${id}`, newNote, {
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
            <h2>Edit Note</h2>
            <form onSubmit={editNote} autoComplete="off">
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

                <button type="submit" onClick={() => {
                    window.location.href = "/";}}>Save</button>
            </form>
        </div>
    );
}