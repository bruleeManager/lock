import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter , Route , Switch} from 'react-router-dom';

import Setup from './components/setup.js';
import Monitroing from './components/monitoring.js';
import Alert from './components/alert.js';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div className= "text-center col-xs-8 col-sm-5 col-md-4 mx-auto" id="cardContainer">
              <Switch>
                  <Route  exact path="/" component= {Setup}/>
              </Switch>
              <Switch>
                  <Route  exact path="/monitoring" component= {Monitroing}/>
              </Switch>
              <Switch>
                  <Route  exact path="/alert" component= {Alert}/>
              </Switch>
          </div>
        </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
