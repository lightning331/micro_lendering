import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history} from './reducers/store';
import { Route, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';


//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  
  ), document.getElementById('root'));
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

//serviceWorker.unregister();
