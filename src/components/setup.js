import React from 'react';
import LockButtons from './lockButton.js';

class Setup extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          header:"Home sweet home?",
          searching: false
        }
    }

    /**
     *To kickstart the app, saving user location and updating exsisting UI and State
     */
    initApp(){

        //start Searching UI
        this.setState({
          header: "Saving User Current Location",
          searching: true
        });
        // Find the user Location
        navigator.geolocation.getCurrentPosition((location) => {
            //success
            // make call to the server to save the location
            this.saveUserCurrntLocation(location).then((data) => {
                if(data.staus == 'ok'){
                    this.props.history.push('/monitoring')
                }
            })} ,
            //faild
            () => {console.log('unable')});

    }

    /**
     *Imaginary call to the server for clearing user current location
     * @param {Object} location - user current location
     */
    saveUserCurrntLocation(location){

        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              staus: 'ok',
              message: `user home location saved, let's start stalking their location`
            });
          }, Math.floor(Math.random() * Math.floor(2))*1000);
        });

    }

    render(){
        return(
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">
              {this.state.header}
            </div>
            <div className="card-body">
              { ! this.state.searching ? <i className="fas fa-lock lockLogo"></i> : null }
              { this.state.searching ? <div className="lds-ripple"><div></div><div></div></div> : null }
              <br/>
              { ! this.state.searching ? <LockButtons name="I am Home" action={()=>{this.initApp();}} /> : null }
            </div>
          </div>
        )
    }

}


export default Setup
