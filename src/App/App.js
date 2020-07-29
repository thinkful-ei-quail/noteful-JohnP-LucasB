import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import Context from '../Context'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    getFolders() {
        fetch('http://localhost:9090/folders')
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong, please try again.')
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    folders: data
                })
            })
            .catch(err => console.log(err.message))
    }

    getNotes() {
        fetch('http://localhost:9090/notes')
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong, please try again.')
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    notes: data
                })
            })
            .catch(err => console.log(err.message))
    }

    addFolder() {
        console.log('clicked add folder')
    }

    componentDidMount() {
        this.getFolders()
        this.getNotes()
    }

    renderNavRoutes() {
        
        return (
            <>
                
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListNav}
                        />
                    ))}
                    <Route
                        path="/note/:noteId"
                        component={NotePageNav}
                    />
                    <Route path="/add-folder" component={NotePageNav} />
                    <Route path="/add-note" component={NotePageNav} />
               
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        const contextValue ={
            folders: this.state.folders,
            notes: this.state.notes,
            addFolder: this.addFolder,
        }
       
        return (
            <Context.Provider value={contextValue}>
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
            </Context.Provider>
        );
    }
}

export default App;
