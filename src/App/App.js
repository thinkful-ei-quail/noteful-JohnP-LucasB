import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import AddNote from '../AddNote/AddNote';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import FetchError from '../FetchError'
import RouteError from '../RouteError'

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error:null
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e.message));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e.message));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders });
            })
            .catch(error => {
                alert(error,);
                console.error({ error });
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddNote = note => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    handleAddFolder = folder => {
        this.setState({
            folders: [...this.state.folders, folder]
        });
    }

    renderNavRoutes() {
        return (
            <FetchError>
                <>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListNav}
                        />
                    ))}
                    <Route path="/note/:noteId" component={NotePageNav} />
                    <Route path="/add-folder" component={NotePageNav} />

                </>
            </FetchError>
        );
    }

    renderMainRoutes() {
        return (
            <RouteError>
                <>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListMain}
                        />
                    ))}
                    <Route path="/add-note" component={AddNote} />
                    <Route path="/note/:noteId" component={NotePageMain} />
                </>
            </RouteError>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            newNote: this.handleAddNote
        };
        return (
            <ErrorBoundary>
                <ApiContext.Provider value={value}>
                    <div className="App">
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                        <header className="App__header">
                            <h1>
                                <Link to="/">Noteful</Link>{' '}
                                <FontAwesomeIcon icon="check-double" />
                            </h1>
                        </header>
                        <main className="App__main">{this.renderMainRoutes()}</main>
                    </div>
                </ApiContext.Provider>
            </ErrorBoundary>
        );
    }
}

export default App;
