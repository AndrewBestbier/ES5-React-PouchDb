/* Imports */
var PouchDB = require('pouchdb');
var db = new PouchDB('SurveyResults');
var _ = require('underscore');

var resultsObject = {
  currentlyUsing: [],
  interestedUsing: [],
  usingES6: [],
  yearsExperience: []
};

var coloursArray = [{
  color: "#F7464A",
  highlight: "#FF5A5E"
}, {
  color: "#46BFBD",
  highlight: "#5AD3D1"
}]

var Api = {
  saveSurvey: function(currentlyUsing, interestedUsing, usingES6, yearsExperience) {

    //GN: There needs to be some error checking here to make sure this is called correctly
    //Dates are not great id's what happens later if someone saves a survey at the exact same time. We will get a collision.
    // Rather let PouchDB autogenerate an _id and have a date field.

    var submission = {
      _id: new Date().toISOString(),
      currentlyUsing: currentlyUsing,
      interestedUsing: interestedUsing,
      usingES6: usingES6,
      yearsExperience: yearsExperience
    };

    //Todo read up on promises and clean this up
    db.put(submission, function callback(err, result) {
      if (err) {
        alert("There was a problem submitting this form");
      } else {
        alert("Thanks for your submission");
      }
    });
  },

  getSurveyResults: function() {
    return db.allDocs({
      include_docs: true
    }).then(function(result) {
      this.sumAndFormatResults(result.rows);
      return resultsObject;
    }.bind(this))
  },

  sumAndFormatResults: function(rows) {
    var _this = this;
    _.each(rows, function(row) {
      _.each(Object.keys(resultsObject), function(key) {
        var answer = row.doc[key]

        var result = _.findWhere(resultsObject[key], {
          label: answer
        });

        if (!result) {
          _this.createResultsObject(answer, key);
        } else {
          result.value += 1;
        }
      })
    })
  },

  createResultsObject: function(answer, key) {
    resultsObject[key].push({
      label: answer,
      value: 1,
      color: coloursArray[resultsObject[key].length].color,
      highlight: coloursArray[resultsObject[key].length].highlight
    })
  }
};

module.exports = Api;
