import React from 'react'
import ApiContext from '../../ApiContext'

export default class AddFolder extends React.Component{
static contextType = ApiContext;

constructor(props){
    super(props);
    this.nameInput=React.createRef();
    this.state ={

    }
}

render(){
    return(
        <section>
            <h2>Add New Folder</h2>
            <form>
                <input type="text" className="name"
                    name="name" id="name"
                    ref={this.nameInput}
                >
                </input>
            </form>
        </section>
    )
}

}
