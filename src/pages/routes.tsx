import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BasicLayout from './BasicLayout';
import CodePen from './CodePen';
import Collection from './Collection';
import Counter from './Counter';
import Explore from './Explore';
import GistHome from './Gist';
import GistNew from './Gist/GistEdit';
import Login from './Login';

export const getRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/gist" component={GistHome} exact={true} />
        <Route path="/gist/new" component={GistNew} exact={true} />
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
