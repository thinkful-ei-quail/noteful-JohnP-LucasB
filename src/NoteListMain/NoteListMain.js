import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
<<<<<<< HEAD
import { shape, string } from 'prop-types'
=======
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
>>>>>>> ef8786b3ce46e94b016d07bce97c3cd8555d52d1

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    notes: []
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <ErrorBoundary>
        <section className='NoteListMain'>
          <ul>
            {notesForFolder.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      </ErrorBoundary>
    )
  }
}

NoteListMain.propTypes = {
  match: shape({
    params: shape({
      folderId: string
    })
  })
}
