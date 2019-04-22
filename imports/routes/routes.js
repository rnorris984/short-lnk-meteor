import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router'; 

import Login from '../ui/Login.js';
import Signup from '../ui/Signup.js';
import Link from '../ui/Link.js';
import NotFound from '../ui/NotFound.js';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/links');
  }
};
// on enter private page check if user is not logged in if they're not redirect to /
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/'); 
  }
}; 

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname; 
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname); 

    if(isUnauthenticatedPage && isAuthenticated){
      browserHistory.replace('/links');
    }else if(isAuthenticatedPage && !isAuthenticated){
      browserHistory.replace('/'); 
    }
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);