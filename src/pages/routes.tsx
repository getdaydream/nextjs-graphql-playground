import { Classes } from '@blueprintjs/core';
import DevTools from 'mobx-react-devtools';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BasicLayout from './BasicLayout';
import CodePen from './CodePen';
import Collection from './Collection';
import Explore from './Explore';
import Login from './Login';
import PostHome from './Post';

export const getRoutes = () => {
  return (
    <div className={Classes.DARK}>
      <DevTools />
      <Switch>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/post" component={PostHome} exact={true} />
        <Route path="/pen" component={CodePen} exact={true} />
        <Route path="/pen/:id" component={CodePen} exact={true} />
        <BasicLayout>
          <Switch>
            <Route path="/collection" component={Collection} />
            <Route path="/explore" component={Explore} />
            <Redirect from="/" to="/explore" />
          </Switch>
        </BasicLayout>
      </Switch>
    </div>
  );
};
