import React from 'react';

import { Random } from 'meteor/random';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';

const generateRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const randomEvent = (start, end) => {
  const startDate = generateRandomDate(start, end);
  // start +2 hours
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  return {
    title: `Event #${Random.id()}`,
    // moment object to simple date object
    start: startDate,
    end: endDate,
  };
};

const getRandomEvents = (start, end) => new Promise((resolve) => {
   setTimeout(() => {
    const eventsNumber = 1 + Math.random() * 9;
  
    let events = [];
  
    for (let i=0; i<eventsNumber; i++) {
      events.push(randomEvent(start.toDate(), end.toDate()));
    }
  
    resolve(events);
   }, 1000);
});


export default class DynamicEventsCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      selectedDate: new Date(),
    };

    this.onEventSelect = this.onEventSelect.bind(this);
    this.onDateChanged = this.onDateChanged.bind(this);
  }

  onEventSelect(start, end) {
    const events = this.state.events;

    const newEventsSource = events.concat({
      title: `Event #${events.length}`,
      // moment object to simple date object
      start: start.toDate(),
      end: end.toDate(),
    });

    this.setState({
      events: newEventsSource,
    });
  }

  onDateChanged(start) {
    this.setState({ selectedDate: start });
  }

  render() {
    const calendarOptions = {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,listMonth,basicWeek,listWeek,basicDay,listDay'
      },

      defaultDate: this.state.selectedDate,

      id: 'calendar-example',
      defaultView: 'agendaDay',
      timezone: 'local',

      editable: true,
      droppable: true,
      selectable: true,

      slotDuration: '00:15',
      scrollTime: '08:00',
      columnFormat: 'ddd DD/MM',
      displayTime: true,
      firstDay: 1,

      select: this.onEventSelect,

      // please, use funciton events source for reactivity support
      events: (start, end, timezone, callback) => {
        console.log('LOAD EVENTS');
        
        getRandomEvents(start, end)
          .then((randomEvents) => {
            callback(randomEvents);
          });
      },
    }

    console.log('RERENDER');

    return(
      <div className="row">
        <div className="calendar">
          <FullCalendar options={calendarOptions} />
        </div>
      </div>
    );
  }
}
