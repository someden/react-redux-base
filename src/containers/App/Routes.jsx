import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from 'modules/Main';
import Products from 'modules/Products';
import Orders from 'modules/Orders';
import Contacts from 'modules/Contacts';

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Main} />
    <Route path='/products/:id?' exact component={Products} />
    <Route path='/orders/:id?' exact component={Orders} />
    <Route path='/contacts' exact component={Contacts} />
    <Route render={() => <h1>Страница не найдена</h1>} />
  </Switch>
);

export default Routes;
