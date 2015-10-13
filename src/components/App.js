/* @flow weak */

"use strict";

var React = require('react');
var Title = require('react-document-title');
var RouteHandler = require('react-router').RouteHandler;
var NavBar = require('./NavBar');

var App = React.createClass({

    render: function() {
        return (
            <Title title='My App'>
            	<div>
            		<NavBar />
	        		<RouteHandler/>
        		</div>
      		</Title>
        );
    }

});

module.exports = App;
