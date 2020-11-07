import React from 'react';
import Header from './notes/navbar.component';
import Home from './notes/home.component';
import CreateNote from './notes/createNote.component';
import EditNote from './notes/editNote.component';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default function Notes({setIsLogin}) {
    return (
        <Router>
            <div className="notes-page">
                <Header setIsLogin={setIsLogin}/>
                <section>
                    <Route path="/" component={Home} exact />
                    <Route path="/create" component={CreateNote} exact />
                    <Route path="/edit/:id" component={EditNote} exact />
                </section>
            </div>
        </Router>
    );
}