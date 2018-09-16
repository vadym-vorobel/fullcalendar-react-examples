import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import Routes from './components/Routes';

import './main.html';

Meteor.startup(() => {
  ReactDOM.render(<Routes />, document.getElementById('render-target'));
});