import React from 'react'
import ApiContext from '../ApiContext'



export default class AddNote extends React.Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.contentInput = React.createRef();
        this.folderSelect = React.createRef();
        this.state = {
            notename: '',
            notecontent: '',
            notefolder: '',
            error: null
        }
    }

    handleNameChange = e => {
        this.setState({ notename: e })
    }

    handleFolderChange = e => {
        console.log(e)
        this.setState({ notefolder: e })
    }


    handleContentChange = e => {

        this.setState({ notecontent: e })
    }


    handleSubmit = e => {

        e.preventDefault();
        const { notename, notecontent, notefolder } = this.state
        console.log(notecontent)
        const BASE_URL = 'http://localhost:9090/notes'
        const newNote = { name: notename, content: notecontent, folderId: notefolder }

        const options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        }

        fetch(BASE_URL, options)
            .then(res => res.ok ? res.json() : console.log('An error occurred.'))
            .then(res => {
                this.context.newNote(res);
            })
            .then(this.props.history.goBack())
    }





    render() {
        const { notename, contentInput, folderSelect } = this.state
        const { folders } = this.context
        return (
            <form>
                <input type='text' id='notename' ref={this.nameInput}
                    onChange={e => this.handleNameChange(e.target.value)}
                    defaultValue='Your Note Name Goes Here' value={notename}></input>

                <textarea id='notecontent' name='content'
                    defaultValue="Your note content goes here."
                    onChange={e => this.handleContentChange(e.target.value)} value={contentInput} />


                <select name='folder' ref={this.folderSelect}
                    onChange={e => this.handleFolderChange(e.target.value)} value={folderSelect}>
                        <option key='0000' value={null}>Select a folder</option>
                    {folders.map(folder =>
                        <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                </select>
                <button type='submit' id='notefolder' onClick={this.handleSubmit}>Add Note</button>
            </form>

        )
    }
}
