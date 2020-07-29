import React from 'react'
import { Link } from 'react-router-dom'


export default class Error extends React.Component{
    render(){
        return(
            <div>
                <h2>Oh no, that page doesn't exist!</h2>
                <Link to='/'>Again, from the top</Link>
            </div>
        )
    }
}
