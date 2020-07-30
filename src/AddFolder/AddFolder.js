import React from 'react'
import ApiContext from '../ApiContext'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';

export default class AddFolder extends React.Component{
static contextType = ApiContext;

constructor(props){
    super(props);
    this.nameInput=React.createRef();
    this.state ={
        folderName: '',
        isValid: false
    }
}

handleFolderName(evt) {
    this.setState({folderName: evt.target.value});
    this.validateFolder(evt.target.value);
}

handleAddFolder(evt) {
    evt.preventDefault();

    const BASE_URL = 'http://localhost:9090/folders'

    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({name: this.state.folderName})}

    fetch(BASE_URL, options)
        .then(res => res.ok ? res.json() : console.log('An error occurred.'))
        .then(res => {

            this.context.addFolder(res);
        })
}

validateFolder(folder) {
    if (folder.length === 0) {
        this.setState({isValid: false});
    } else {
        this.setState({isValid: true});
    }
}

render(){
    return(
        <ErrorBoundary>
            <li>
                <h2>Add New Folder</h2>
                <form>
                    <input type="text" className="name"
                        name="name" id="name"
                        ref={this.nameInput} value={this.state.folderName}
                        onChange={(evt) => this.handleFolderName(evt)}
                    >
                    </input>
                    {!this.state.isValid && <p>The foldername cannot be empty</p>}
                    {this.state.isValid && <button type="submit" onClick={(evt) => this.handleAddFolder(evt)}>+</button>}
                </form>
            </li>
        </ErrorBoundary>
    )
}
}

AddFolder.propTypes = {
    folderName: PropTypes.string.isRequired
}