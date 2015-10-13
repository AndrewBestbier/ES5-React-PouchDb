"use strict";

var React = require('react');
var PouchDB = require('pouchdb');

/* Component Imports */
var Panel = require('react-bootstrap').Panel;
var PieGraph = require("react-chartjs").Pie;

/* React Component */
var Survey = React.createClass({

	getInitialState: function () {
	    return {
	        results: {},
	    };
	},

	componentDidMount: function(){
    //GN: THis is all business logic.
    // Don't stick this in a React component. Rather put is in some plain javascript files 
    // eg src/api/survey.js
    // Then that module just has two functions one is save survey and another is getSurveyResults
    // Then all that the React components do is get the results on a render and display them
    // You always want to keep your components as dumb as possible

		var db = new PouchDB('SurveyResults');

		var resultsObject = {
        	currentlyUsing: [
        		{
        			//Angular
        			value: 0,
        			label: 'Angular',
        			color:"#F7464A",
  	        		highlight: "#FF5A5E",
        		},
        		{
        			//React
        			value: 0,
        			label: 'React',
        			color: "#46BFBD",
  	        		highlight: "#5AD3D1",
        		}
        	],
        	interestedUsing: [
        		{
        			//Angular
        			value: 0,
        			label: 'Angular',
        			color:"#F7464A",
  	        		highlight: "#FF5A5E",
        		},
        		{
        			//React
        			value: 0,
        			label: 'React',
        			color: "#46BFBD",
  	        		highlight: "#5AD3D1",
        		}
        	],
        	usingES6: [
        		{
        			//True
        			value: 0,
        			label: 'Using ES6',
        			color:"#F7464A",
  	        		highlight: "#FF5A5E",
        		},
        		{
        			//False
        			value: 0,
        			label: 'Using ES6',
        			color: "#46BFBD",
  	        		highlight: "#5AD3D1",
        		}
        	],
        	yearsExperience: [
        		{
        			//True
        			value: 0,
        			label: 'One Year',
        			color:"#F7464A",
  	        		highlight: "#FF5A5E",
        		},
        		{
        			//False
        			value: 0,
        			label: 'Two Years',
        			color: "#46BFBD",
  	        		highlight: "#5AD3D1",
        		}
        	]
	    };

    //GN: You can fix this up in two ways. The first would be to use a map reduce view (I think you mentioned that)
      //or you can do a a cool function reduce function (you will have to read up on reduce). Checkout underscore.js
      // something like:
      // return docs.rows.reduce(function (results, row) {
      //
      //    ['currentlyUsing', 'interestedUsing', 'usingES6', 'yearsExperience'].forEach(function (section) {
      //       if (!results[section][row[section]]) {
      //        results[section][row[section]] = 1
      //
      //       } else {
      //       results[section][row[section]] += 1;
      //
      //       }
      //    });
      //
      //    return results;
      //
      // }, {});
      // You will have to adjust your resultsObject a bit to fit that. But its so much neater code. 
      // And you can later convert to an array for the charts.
      
      
		db.allDocs({include_docs: true, descending: true}, function(err, doc) {
		    doc.rows.forEach(function(row){

		    	//Mapping the frameworks they are currently using
		    	if(row.doc.currentlyUsing === "angular"){
		    		resultsObject.currentlyUsing[0].value += 1;
		    	} else if (row.doc.currentlyUsing === "react"){
		    		resultsObject.currentlyUsing[1].value += 1;
		    	}

		    	//Mapping the frameworks they want to use
		    	if(row.doc.interestedUsing === "angular"){
		    		resultsObject.interestedUsing[0].value += 1;
		    	} else if (row.doc.currentlyUsing === "react"){
		    		resultsObject.interestedUsing[1].value += 1;
		    	}

		    	//Mapping whether they use Es6 or not
		    	if(row.doc.usingES6){
		    		resultsObject.usingES6[0].value += 1;
		    	} else {
		    		resultsObject.usingES6[1].value += 1;
		    	}

		    	//Mapping their years of experience
		    	if(row.doc.yearsExperience === 1){
		    		resultsObject.yearsExperience[0].value += 1;
		    	} else if (row.doc.yearsExperience === 2) {
		    		resultsObject.yearsExperience[1].value += 1;
		    	}

		    })

		    //Setting the results into the state
		    this.setState({
		    	results: resultsObject
		    })

		}.bind(this));
	},

    render: function() {

    	if(Object.keys(this.state.results).length === 0){
    		return (
    			<h2>There is no data to display </h2>
    		)
    	} else {
    		return (
    			<div>
    				<Panel>
    					<h4>Which of these frameworks are you currently using the most?</h4>
	    				<PieGraph data={this.state.results.currentlyUsing}/>
	    			</Panel>

	    			<Panel>
	    				<h4>Which of these frameworks are you most interested in using?</h4>
	    				<PieGraph data={this.state.results.interestedUsing}/>
	    			</Panel>

	    			<Panel>
	    				<h4>Are you using ES6?</h4>
	    				<PieGraph data={this.state.results.usingES6}/>
	    			</Panel>

	    			<Panel>
	    				<h4>How many years of Javascript experience do you have?</h4>
	    				<PieGraph data={this.state.results.yearsExperience}/>
	    			</Panel>
    			</div>
    		)
    	}
    }
});

module.exports = Survey;
