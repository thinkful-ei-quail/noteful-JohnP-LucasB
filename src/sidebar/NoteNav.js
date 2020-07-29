import React from "react";
import { Link } from 'react-router-dom'


export default class NoteNav extends React.Component {


    render() {
        const { name } = this.props
        return (

            <div>
                <nav>
                    <Link to='/'>Go Back</Link>
                </nav>
                <h2>{name}</h2>
            </div>
        )
    }
}
