"use strict";

var React = require('react');
var routes = require('./routes');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    React.render(<Handler routerState={state} environment="browser" />, document.body);
});