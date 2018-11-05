import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BasicLayout from './BasicLayout';
import CodeEditor from './CodeEditor';
import Collection from './Collection';
import Counter from './Counter';
import Explore from './Explore';

export const getRoutes = () => {
  return (
    <BasicLayout>
      <Switch>
        <Route path="/codeeditor" component={CodeEditor} />
        <Route path="/collection" component={Collection} />
        <Route path="/explore" component={Explore} />
        <Route path="/counter" component={Counter} />
        <Redirect from="/" to="/explore" />
      </Switch>
    </BasicLayout>
  );
};
