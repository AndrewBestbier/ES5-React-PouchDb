"use strict";

var React = require('react');

/* Component Imports */
var Title = require('react-document-title');
var Panel = require('react-bootstrap').Panel;

/* React Component */
var Home = React.createClass({

    render: function() {

        return (
            <Title title='Home'>
                <Panel>Hello World</Panel>
          	</Title>
        );
    }
});

module.exports = Home;