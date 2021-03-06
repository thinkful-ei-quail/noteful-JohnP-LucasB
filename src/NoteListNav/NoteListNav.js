import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import { isThisMonth } from 'date-fns'
import AddFolder from '../AddFolder/AddFolder';

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  state = {
    toggleAddFolder: false
  }

  handleToggleAddFolder() {
    this.setState({toggleAddFolder: !this.state.toggleAddFolder})
  }

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
          {this.state.toggleAddFolder && <AddFolder />}
        </ul>
  
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            type='button'
            className='NoteListNav__add-folder-button'
            onClick={() => this.handleToggleAddFolder()}
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
