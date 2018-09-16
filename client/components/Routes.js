import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import SimpleCalendar from './SimpleCalendar';
import DynamicDateCalendar from './DynamicDateCalendar';
import DynamicEventsCalendar from './DynamicEventsCalendar';

export default function () {
  return (
    <Router>
      <div>
        <div>
          <h1>fullcalendar-react-examples</h1>
          <a href="https://github.com/vadym-vorobel/fullcalendar-react">
            https://github.com/vadym-vorobel/fullcalendar-react
          </a>
        </div>

        <ul>
          <li>
            <Link to="/">simple calendar</Link>
          </li>
          <li>
            <Link to="/dynamic-date">dynamic date calendar</Link>
          </li>
          <li>
            <Link to="/dynamic-events">dynamic events calendar</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={SimpleCalendar} />
        <Route path="/dynamic-date" component={DynamicDateCalendar} />
        <Route path="/dynamic-events" component={DynamicEventsCalendar} />
      </div>
    </Router>
  );
};