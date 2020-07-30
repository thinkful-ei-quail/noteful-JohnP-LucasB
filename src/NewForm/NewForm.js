import React from 'react'
import ApiContext from '../../ApiContext'


export default class NewForm extends React.Component {



    render() {
    const{}=this.props
        return (
            <form>
                <input type="text" className="name"
                    name="name" id="name"
                    ref={this.nameInput}
                >
                </input>
            </form>
        )
    }

}
