import React, { Component } from 'react';
import Note from './Note'


export default class NoteList extends Component {
    render() {
        const { notes } = this.props
        return (
            <div>
                <ul>
                    {notes.map((note) => {
                        const { id, name, modified, content } = note
                        return (
                            <li key={id}>

                                    <Note {...{ name, modified, content, id }} />

                            </li>
                        )
                    })}
                </ul>
            </div>

        )
    }
}



//<Link to={`/note/${id}`} key={id}>{name}</Link>
