import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Note extends Component {


    render() {
        const { modified, content, name, expanded, id } = this.props
        const modtext= (new Date(modified)).toDateString()
        return (

            <div>
                <h3><Link to={`/note/${id}`}>{name}</Link></h3>
                <span>{modtext}</span>
                {expanded && <p>{content}</p>}
            </div>
        )
    }

}
