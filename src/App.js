import React from 'react';
import store from './dummy-store'
import './App.css';
import NoteList from './notes/NoteList';
import Folders from './sidebar/FoldersNav'
import Note from './notes/Note'
import NoteNav from './sidebar/NoteNav'
import Error from './Error'
import { Route, Switch, Link } from 'react-router-dom'



export default class App extends React.Component {


  findNoteById = (id) => this.state.notes.find(note => note.id === id)

  findFolderById = (id) => this.state.folders.find(folder => folder.id === id)

  state = store;

  render() {
    const { notes, folders } = this.state
    return (
      <>
        <header>
        <h1><Link to='/'>noteful.</Link></h1>
        </header>
        <main className="main-notes-display">
          <Switch>
            <Route exact path='/' render={() => <NoteList notes={notes} />} />
            <Route exact path='/folder/:folderId' render={(props) => <NoteList notes={notes.filter((note) => note.folderId === props.match.params.folderId)} />} />
            <Route exact path='/note/:id'
              render={
                ((props) => {
                  const note = this.findNoteById(props.match.params.id)
                  if (note) {
                    const { name, content, modified } = note
                    return <Note {...{ name, content, modified }} expanded={true} />
                  } else {
                    return <Error />
                  }
                })
              }
            />
            <Route path='/' render={() => <Error />} />
          </Switch>
        </main>
        <aside className="left-sidebar">
          <Switch>
            <Route exact path='/note/:id'
              render={
                (props) => {
                  const note = this.findNoteById(props.match.params.id);
                  if (note) {
                    const folder = this.findFolderById(note.folderId)
                    if (folder) {
                      return <NoteNav name={folder.name} />
                    }
                  }
                  return <Folders folders={folders} />
                }
              } />
            <Route path='/' render={() => <Folders folders={folders} />} />
          </Switch>
        </aside>
      </>
    )
  }
}
