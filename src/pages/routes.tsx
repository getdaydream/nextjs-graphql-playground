import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BasicLayout from './BasicLayout';
import CodePen from './CodePen';
import Collection from './Collection';
import Counter from './Counter';
import Explore from './Explore';
import Gist from './Gist';
import Login from './Login';

export const getRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/gist" component={Gist} />
        <Route path="/pen" component={CodePen} exact={true} />
        <Route path="/pen/:id" component={CodePen} exact={true} />
        <BasicLayout>
          <Switch>
            <Route path="/collection" component={Collection} />
            <Route path="/explore" component={Explore} />
            <Route path="/counter" component={Counter} />
            <Redirect from="/" to="/explore" />
          </Switch>
        </BasicLayout>
      </Switch>
    </Fragment>
  );
};
