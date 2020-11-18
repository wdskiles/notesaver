import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import axios from 'axios';

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [notesSet, setNotesSet] = useState(false);
    const [token, setToken] = useState('');
    const [sort, setSort] = useState();
    const [shouldRefresh, setShouldRefresh] = useState(false);

    var checkForRefresh = setInterval(function() {
        if (shouldRefresh) {
            window.location.reload();
        }
    }, 500);

    useEffect(() => {
        let mounted = true;
        const token = localStorage.getItem('tokenStore');

        const getNotes = async (token) => {
            let mounted = true;
            const res = await axios.get('api/notes', {
                headers:{Authorization: token}
            });
            const res2 = await axios.get('api/sort', {
                headers:{Authorization: token}
            });
            //console.log(res2.data[0].sort_number);
            if (res2.data[0] != null) {
                setSort(res2.data[0].sort_number);
                //console.log(res2.data[0].sort_number);
                //console.log("Set sort to whatever res2 is!");
                if (res2.data[1] != null) {
                    await axios.delete(`api/sort/${res2.data[1]._id}`, {
                        headers: {Authorization: token}
                    });
                    console.log("Deleted extra");
                }
            }
            else {
                await axios.post('api/sort', {
                    sort_number: 1
                },{
                    headers:{Authorization: token}
                });
                //console.log("Successfully created sort!");
                setSort(1);
            }
            //console.log(sort);
            if (mounted) {
                if(res.data && !notesSet) {
                    if(sort === 0) {
                        setNotes(res.data.sort((a,b) => (a.date > b.date) ? -1: 1));
                        setNotesSet(true);
                        //console.log("Sorting by date");
                    }
                    if(sort === 1) {
                        setNotes(res.data.sort((a,b) => (a.title > b.title) ? 1: -1));
                        setNotesSet(true);
                        //console.log("Sorting by name");
                    }
                    if(sort === 2) {
                        setNotes(res.data.sort((a,b) => (a.category > b.category) ? 1: -1));
                        setNotesSet(true);
                        //console.log("Sorting by category");
                    }
                    //console.log(res.data);   
                }
            }
            //checkForRefresh();
            return () => mounted = false;
        }

        if (mounted) {    
            setToken(token);
            if (token) {
                getNotes(token);
            }
        }
        return () => mounted = false;
    }, [setToken, sort, checkForRefresh, notesSet]);

    const deleteNote = async (id) => {
        let mounted = true;
        try {
            if (token && mounted) {
                await axios.delete(`api/notes/${id}`, {
                    headers: {Authorization: token}
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            window.location.href= "/";
        }
        return () => mounted = false;
    }

    const sortByDate = async () => {
        const token = localStorage.getItem('tokenStore');
        const res = await axios.get('api/sort', {
            headers:{Authorization: token}
        });
        //console.log(res2.data[0].sort_number);
        const NewSort = {
            sort_number: 0
        }
        if (res.data[0] != null) {
            await axios.put(`api/sort`, NewSort, {
                headers: {Authorization: token}
            }).then(setShouldRefresh(true));
        }
        else {
            await axios.post('api/sort', {
                sort_number: 0
            },{
                headers:{Authorization: token}
            }).then(setShouldRefresh(true));
            //console.log("Successfully created sort!");
        }
        setSort(0);
    }

    const sortAlphabetically = async () => {
        const token = localStorage.getItem('tokenStore');
        const res = await axios.get('api/sort', {
            headers:{Authorization: token}
        });
        //console.log(res2.data[0].sort_number);
        const NewSort = {
            sort_number: 1
        }
        if (res.data[0] != null) {
            await axios.put(`api/sort`, NewSort, {
                headers: {Authorization: token}
            }).then(setShouldRefresh(true));
            //console.log(res2.data[0].sort_number);
            //console.log("Set sort to whatever res2 is!");
        }
        else {
            await axios.post('api/sort', {
                sort_number: 1
            },{
                headers:{Authorization: token}
            }).then(setShouldRefresh(true));
            //console.log("Successfully created sort!");
        }
        setSort(1);
    }

    const sortByCategory = async () => {
        const token = localStorage.getItem('tokenStore');
        const res = await axios.get('api/sort', {
            headers:{Authorization: token}
        });
        //console.log(res2.data[0].sort_number);
        const NewSort = {
            sort_number: 2
        }
        if (res.data[0] != null) {
            await axios.put(`api/sort`, NewSort, {
                headers: {Authorization: token}
            }).then(setShouldRefresh(true));
            //console.log(res2.data[0].sort_number);
            //console.log("Set sort to whatever res2 is!");
        }
        else {
            await axios.post('api/sort', {
                sort_number: 2
            },{
                headers:{Authorization: token}
            }).then(setShouldRefresh(true));
            //console.log("Successfully created sort!");
        }
        setSort(2);
    }

    return (
            <div className="note-wrapper home">
               
                <div className="sorter">
                    <p>Sorting:
                    
                    <button onClick={() => {
                        sortByDate();
                    }}>Date Created</button> 
                    
                    <button onClick={() => {
                        sortAlphabetically();
                    }}>Alphabetically</button>
                    
                    <button onClick={() => {
                        sortByCategory();
                    }}>Category</button>
                    </p>
                </div>
                {
                    notes.map(note => (

                        <div className="card" key={note._id}>
                            
                            <h4 title={note.title}>{note.title}</h4>
                            <div className="text-wrapper">
                                <p>{note.content}</p>
                            </div>
                            <p className="date">{format(note.date)}</p>
                            
                            <div className="card-footer">
                                {note.category}
                                <Link to={`edit/${note._id}`}> Edit</Link>
                            </div>
                            <button className="close" onClick={() => {
                                deleteNote(note._id);}}>X</button>
                        </div>
                    ))
                }
            </div>
    );
}