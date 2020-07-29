import React from "react";
import { NavLink } from 'react-router-dom'


export default class Folders extends React.Component {


    render() {
        const { folders } = this.props
        return (
            <nav>
                    {folders.map((folder) => {
                        const { id, name } = folder
                        return <NavLink to={`/folder/${id}`} key={id}>{name}</NavLink>
                    })}
            </nav>
        )
    }
}
