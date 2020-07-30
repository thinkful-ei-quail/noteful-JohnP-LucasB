import React from 'react'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types';
import './AddNote.css'
import FetchError from '../FetchError'


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
            notemodified: '',
            error: null,
            validName: false,
            validFolder: false,
            validContent: false
        }
    }

    componentDidMount() {
        this.setDate()
    }

    handleNameChange = e => {
        this.setState({ notename: e })
        this.validateName(e)
    }

    handleFolderChange = e => {
        this.setState({ notefolder: e })
        this.validateFolder(e)
    }

    handleContentChange = e => {
        this.setState({ notecontent: e })
        this.validateContent(e)
    }

    validateName(name) {
        if (name.length < 1) {
            this.setState({ validName: false })
        } else {
            this.setState({ validName: true })
        }
    }

    validateFolder(id) {
        if (id === null) {
            this.setState({ validFolder: false })
        } else {
            this.setState({ validFolder: true })
        }
    }

    validateContent(content) {
        if (content.length < 1) {
            this.setState({ validContent: false })
        } else {
            this.setState({ validContent: true })
        }
    }

    setDate() {
        // setTimeout(function(){ alert("Hello"); }, 3000);
        let newDate = new Date().toISOString();
        console.log(newDate);
        this.setState({ notemodified: newDate })
    }

    handleSubmit = e => {

        e.preventDefault();
        const { notename, notecontent, notefolder, notemodified } = this.state
        console.log(notecontent)
        const BASE_URL = 'http://localhost:9090/notes'
        console.log("here's the date" + notemodified);
        const newNote = { name: notename, content: notecontent, folderId: notefolder, modified: notemodified }

        const options = {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        }

        fetch(BASE_URL, options)
            .then(res => res.ok ? res.json() : new Error(res.message))
            .then(res => {
                this.context.newNote(res);
            })
            .then(this.props.history.goBack())
    }


    render() {
        const { notename, contentInput, folderSelect, validName, validContent, validFolder } = this.state
        const { folders } = this.context
        return (
            <FetchError>
            <div className="AddNoteContainer">
                <form>
                    <input type='text' id='notename' ref={this.nameInput}
                        onChange={e => this.handleNameChange(e.target.value)}
                        defaultValue='Your Note Name Goes Here' value={notename}></input>
                    {!validName && <p>Name cannot be empty</p>}

                    <textarea id='notecontent' name='content'
                        defaultValue="Your note content goes here."
                        onChange={e => this.handleContentChange(e.target.value)} value={contentInput} />
                    {!validContent && <p>Content cannot be empty</p>}

                    <select name='folder' ref={this.folderSelect}
                        onChange={e => this.handleFolderChange(e.target.value)} value={folderSelect}>
                        <option key='0000' value={null}>Select a folder</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                    {!validFolder && <p>Choose a valid folder</p>}
                    {validName && validContent && validFolder && <button type='submit' id='notefolder' onClick={this.handleSubmit}>Add Note</button>}
                </form>
            </div>
            </FetchError>
        )
    }
}

AddNote.propTypes = { history: PropTypes.shape({ goBack: PropTypes.func }) };
