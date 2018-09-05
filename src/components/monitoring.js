import React from 'react';
import LockButtons from './lockButton.js';

class Monitroing extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          header:"Monitroing User Location",
        }
        this.chekcer;
    }

    componentDidMount() {
        this.chekcer = setTimeout(this.checkingLocation(), 10000);
    }

  /**
   *Clear usering location in the server and return to home page
   */
    stopMonitoring(){
      this.setState({header: "Terminating..."});
      this.clearUserCurrntLocation().then(()=>{
          clearTimeout(this.chekcer);
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

    /**
     * Get User current location and see if it matches user Home location from the server
     * will recuring checking if the location is the same
     */
    checkingLocation(){
      navigator.geolocation.getCurrentPosition((location) => {
          //success
          // make call to the server to save the location
          this.checkUserLocationWithDB(location).then((data) => {
              if(data.staus == 'fail'&& window.location.pathname != "/"){
                  this.props.history.push('/alert')
              }else if (data.staus == 'ok'){
                //user haven't left their place
                this.checkingLocationHelper();
              }
          })} ,
          //faild
          () => {console.log('unable to get user location')});
    }

    /**
     * A helper function for recurring calling checkingLocation()
     */
    checkingLocationHelper(){
        this.chekcer = setTimeout(this.checkingLocation(), 10000);
    }

    /**
     * see if it matches user Home location from the server,I had set it to a random number where it might failed sometime
     * @param {Object} location - user current location
     */
    checkUserLocationWithDB(location){
        let random = Math.floor(Math.random() * Math.floor(10));
        if (random >= 7 ){
            // location doesn't matches
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  staus: 'fail',
                  message: `User left`
                });
              }, Math.floor(Math.random() * Math.floor(2))*1000);
            });

        }else{
            // location  matches
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({
                  staus: 'ok',
                  message: `User is still home`
                });
              }, Math.floor(Math.random() * Math.floor(2))*1000);
            });
        }
    }

    render(){
        return(
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">
              {this.state.header}
            </div>
            <div className="card-body">
              <div className="lds-ripple"><div className="forceRed"></div><div className="forceRed"></div></div>
              <br/>
              <LockButtons name="Stop monitoring" action={()=>{this.stopMonitoring();}} />
            </div>
          </div>
        )
    }

}


export default Monitroing
