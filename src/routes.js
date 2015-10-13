"use strict";

var React = require('react');
var Route = require('react-router').Route;
var NotFoundRoute = require('react-router').NotFoundRoute;
var DefaultRoute = require('react-router').DefaultRoute;
var Redirect = require('react-router').Redirect;

var Routes = (
    <Route handler={require('./components/App')}>
    	<DefaultRoute handler={require('./components/Survey')}/>
    	<Route name="survey" handler={require('./components/Survey')}/>
    	<Route name="results" handler={require('./components/Results')}/>
    	<NotFoundRoute handler={require('./components/NotFound')}/>
  	</Route>
);

module.exports = Routes;