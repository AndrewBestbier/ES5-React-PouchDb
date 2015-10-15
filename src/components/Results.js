"use strict";

var React = require('react');
var PouchDB = require('pouchdb');
var Api = require('../api/Api');

/* Component Imports */
var Panel = require('react-bootstrap').Panel;
var PieGraph = require("react-chartjs").Pie;

/* React Component */
var Survey = React.createClass({

  getInitialState: function() {
    return {
      results: {}
    };
  },

  componentDidMount: function() {
    Api
      .getSurveyResults()
      .then(function(results) {
        this.setState({
          results: results
        })
      }.bind(this))
  },

  render: function() {

    if (Object.keys(this.state.results).length === 0) {
      return (
        <h2>
          There is no data to display
        </h2>
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
