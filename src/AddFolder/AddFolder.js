import React from 'react'
import ApiContext from '../ApiContext'

export default class AddFolder extends React.Component{
static contextType = ApiContext;

constructor(props){
    super(props);
    this.nameInput=React.createRef();
    this.state ={
        folderName: ''
    }
}

handleFolderName(evt) {
    this.setState({folderName: evt.target.value})
}

handleAddFolder(evt) {
    evt.preventDefault();

    const BASE_URL = 'http://localhost:9090/folders'
    
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({name: this.state.folderName})}
    
    fetch(BASE_URL, options)
        .then(res => res.ok ? res.json() : console.log('YOU FUCKED IT ALL UP GODDAMNIT'))
        .then(res => {
            console.log(res);
            this.context.addFolder(res);
        })
}

render(){
    return(
        <li>
            <h2>Add New Folder</h2>
            <form>
                <input type="text" className="name"
                    name="name" id="name"
                    ref={this.nameInput} value={this.state.folderName}
                    onChange={(evt) => this.handleFolderName(evt)}
                >
                </input>
                <button type="submit" onClick={(evt) => this.handleAddFolder(evt)}>+</button>
            </form>
        </li>
    )
}

}
