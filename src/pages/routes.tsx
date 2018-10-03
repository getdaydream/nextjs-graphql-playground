import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BasicLayout from './BasicLayout';
import Collection from './Collection';
import Explore from './Explore';

export const getRoutes = () => {
  return (
    <BasicLayout>
      <Switch>
        <Route path="/collection" component={Collection} />
        <Route path="/explore" component={Explore} />
        <Redirect from="/" to="/explore" />
      </Switch>
    </BasicLayout>
  );
};
