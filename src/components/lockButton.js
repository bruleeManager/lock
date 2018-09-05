import React from 'react';

class LockButtons extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
          <span className="input-group-btn">
                <button
                    type='submit'
                    className="btn btn-outline-success margin-top-20"
                    onClick={this.props.action}>{this.props.name}</button>
          </span>
        )
    }

}


export default LockButtons
