"use strict";

var React = require('react');
var PouchDB = require('pouchdb');

/* Component Imports */
var Panel = require('react-bootstrap').Panel;

/* React Component */
var Survey = React.createClass({

	getInitialState: function () {
	    return {
	        results: []
	    };
	},

	componentDidMount: function(){
		var db = new PouchDB('SurveyResults');

		db.allDocs({include_docs: true, descending: true}, function(err, doc) {
		    this.setState({
				results: doc.rows
			});
		}.bind(this));
	},

    render: function() {


    	var results = this.state.results.map(function(result){

    		return (
    			<Panel>
    				<div><b>Currently Using:</b> {result.doc.currentlyUsing}</div>
    				<div><b>Interested in Using:</b> {result.doc.interestedUsing}</div>
    				<div><b>using ES6:</b> {result.doc.usingES6.toString()}</div>
    				<div><b>Years of Experience:</b> {result.doc.yearsExperience}</div>
    			</Panel>
    		);
    	});

        return (
    		<div>
            	{results}
            </div>
        );
    }
});

module.exports = Survey;