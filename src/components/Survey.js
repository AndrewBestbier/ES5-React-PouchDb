"use strict";

var React = require('react');
var PouchDB = require('pouchdb');

/* Component Imports */
var Panel = require('react-bootstrap').Panel;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;

/* React Component */
var Survey = React.createClass({


	handleSubmit: function(){

		var currentlyUsing = this.refs.currentlyUsing.getValue();
		var interestedUsing = this.refs.interestedUsing.getValue();
		var usingES6 = Boolean(this.refs.usingES6.getValue());
		var yearsExperience = parseInt(this.refs.yearsExperience.getValue());

		var db = new PouchDB('SurveyResults');

		var submission = {
		    _id: new Date().toISOString(),
		    currentlyUsing: currentlyUsing,
		    interestedUsing: interestedUsing,
		    usingES6: usingES6,
		    yearsExperience: yearsExperience
		  };


		  db.put(submission, function callback(err, result) {
		      if (err) {
		        alert("There was a problem submitting this form");
		      } else {
		        alert("Thanks for your submission");
		      }
		  });

	},

    render: function() {

        return (
        	<Panel>
	            <Input type="select" label="Which of these frameworks are you currently using the most?" ref="currentlyUsing">
			      <option value="angular">Angular</option>
			      <option value="react">React</option>
			    </Input>
			    <Input type="select" label="Which of these frameworks are you most interested in using?" ref="interestedUsing">
			      <option value="angular">Angular</option>
			      <option value="react">React</option>
			    </Input>
			    <Input type="select" label="Are you using ES6?" placeholder="select" ref="usingES6">
			      <option value="true">Yes</option>
			      <option value="false">No</option>
			    </Input>
			    <Input type="select" label="How many years of Javascript experience do you have?" ref="yearsExperience">
			      <option value="1">0-1</option>
			      <option value="2">1-2</option>
			    </Input>
			    <ButtonInput type="submit" value="Submit" bsSize="medium" onClick={this.handleSubmit} />
		    </Panel>
        );
    }
});

module.exports = Survey;
