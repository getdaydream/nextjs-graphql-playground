import DevTools from '@/components/ReduxDevTools';
import { Classes } from '@blueprintjs/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BasicLayout from './BasicLayout';
import CodePen from './CodePen';
import Collection from './Collection';
import Counter from './Counter';
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
            <Route path="/counter" component={Counter} />
            <Redirect from="/" to="/explore" />
          </Switch>
        </BasicLayout>
      </Switch>
    </div>
  );
};
