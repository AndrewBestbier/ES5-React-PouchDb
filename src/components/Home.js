"use strict";

var React = require('react');
var PouchDB = require('pouchdb');

/* Component Imports */
var Title = require('react-document-title');
var Panel = require('react-bootstrap').Panel;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;

/* React Component */
var Home = React.createClass({


	handleSubmit: function(){

		var currentlyUsing = this.refs.currentlyUsing.getValue();
		var interestedUsing = this.refs.interestedUsing.getValue();
		var usingES6 = this.refs.usingES6.getValue();
		var yearsExperience = this.refs.yearsExperience.getValue();
		
	},

    render: function() {

        return (
        	<Panel>
	            <Input type="select" label="Which of these frameworks are you currently using the most?" ref="currentlyUsing">
			      <option value="node">Node</option>
			      <option value="angular">Angular</option>
			      <option value="node">Express</option>
			      <option value="react">React</option>
			      <option value="meteor">Meteor</option>
			    </Input>
			    <Input type="select" label="Which of these frameworks are you most interested in using?" ref="interestedUsing">
			      <option value="node">Node</option>
			      <option value="angular">Angular</option>
			      <option value="node">Express</option>
			      <option value="react">React</option>
			      <option value="meteor">Meteor</option>
			    </Input>
			    <Input type="select" label="Are you using ES6?" placeholder="select" ref="usingES6">
			      <option value="true">Yes</option>
			      <option value="false">No</option>
			    </Input>
			    <Input type="select" label="How many years of Javascript experience do you have?" ref="yearsExperience">
			      <option value="0">0-1</option>
			      <option value="1">1-2</option>
			      <option value="2">2-3</option>
			      <option value="3">3-4</option>
			      <option value="4">4+</option>
			    </Input>
			    <ButtonInput type="submit" value="Submit" bsSize="medium" onClick={this.handleSubmit} />
		    </Panel>
        );
    }
});

module.exports = Home;