import React from 'react';
import LockButtons from './lockButton.js';

class Alert extends React.Component {

    constructor(props){
        super(props);
    }

    /**
     *Clear usering location in the server and return to home page
     */
      backTOhome(){
        this.setState({header: "Terminating..."});
        this.clearUserCurrntLocation().then(()=>{
            this.props.history.push('/');
        });
      }

      /**
       *Imaginary call to the server for clearing user current location
       */
      clearUserCurrntLocation(){
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                staus: 'ok'
              });
            }, Math.floor(Math.random() * Math.floor(2))*1000);
          });
      }

    render(){
        return(
          <div>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">
              Remember To Lock Your Door
            </div>
            <div className="card-body">
              <i className="fas fa-exclamation warningLogo"></i>
              <br/>
              <LockButtons name="Door Locked" action={()=>{this.backTOhome();}} />
            </div>
          </div>
          </div>
        )
    }

}


export default Alert
