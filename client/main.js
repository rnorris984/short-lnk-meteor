import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker'; 
import { Session } from 'meteor/session'; 

import { routes, onAuthChange } from '../imports/routes/routes.js';
import '../imports/startup/simple-schema-configuration.js';


Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId(); 
    onAuthChange(isAuthenticated);
});

// Tracker.autorun(() => {
//   const name = Session.get('name');
//   console.log('Name: ', name);
// });

// Session.set('name', 'Andrew Mead');


// Stateless functional component, presentational component
// import React from 'react'; 
// const MyComponent = (props) => {
//   return (
//     <div>
//       <h1>My Componenet is here! {props.name}</h1>
//     </div>
//   );
// };

Meteor.startup(() => {  
  // Meteor.call('addNumbers', 11, 768, (err, res) => {
  //   console.log('The result is ', res); 
  // });
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
