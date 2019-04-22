import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'; 
// import moment from 'moment';

import '../imports/api/users.js';
import { Links } from '../imports/api/links.js';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // let now = new Date().getTime();
  // console.log(now);

  // let momentNow = moment(0);
  // console.log(momentNow.fromNow());

  // creating and registerig new middleware function
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1); 
    const link = Links.findOne({ _id: _id }); 

    if(link){
        res.statusCode = 302; 
        res.setHeader('Location', link.url);
        res.end(); 
        Meteor.call('links.trackVisit', _id);
    } else {
        next(); 
    }
  });
  // // code to run on server at startup
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is from my custom middleware');
  //   console.log(req.url, req.method, req.headers, req.query); 
  //   // Set http status code
  //   // res.statusCode = 404; 
  //   // Set http header
  //   // res.setHeader('my-custom-header', 'Richie was here!');
  //   // Set http body
  //   // res.write('<h1>Irish Stew Soon</h1>');
  //   // End http request
  //   // res.end(); 

  //   next(); 
  // });
});

// request comes in
// run our middleware one at a time
// send them that page
