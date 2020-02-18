import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import Login from 'containers/Login';
import App from 'containers/App';
import Errors from 'containers/Errors';

import createStore from './store';

const { store, history } = createStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={App} />
        </Switch>
        <Errors />
      </Fragment>
    </ConnectedRouter>
  </Provider>
);

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/App', render);
}
