/* Imports */
var PouchDB = require('pouchdb');
var db = new PouchDB('SurveyResults');
var _ = require('underscore');

var coloursArray = [{
  color: "#F7464A",
  highlight: "#FF5A5E"
}, {
  color: "#46BFBD",
  highlight: "#5AD3D1"
}]

module.exports = {
  saveSurvey: function(currentlyUsing, interestedUsing, usingES6, yearsExperience) {

    var submission = {
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
    var resultsObject = this.createEmptyResultsObject();

    return db.allDocs({
      include_docs: true
    }).then(function(result) {
      this.populateResultsObjectWithData(result.rows, resultsObject);
      return resultsObject;
    }.bind(this))
  },

  createEmptyResultsObject: function(){
      var emptyResultsObject = {
        currentlyUsing: [],
        interestedUsing: [],
        usingES6: [],
        yearsExperience: []
      };
      return emptyResultsObject;
  },

  populateResultsObjectWithData: function(rows, resultsObject) {
    _.each(rows, function(row) {
      _.each(resultsObject, function(array, key) {
        var answer = row.doc[key]

        var result = _.findWhere(resultsObject[key], {
          label: answer
        });

        if (!result) {
          this.createAnswerEntry(answer, key, resultsObject);
        } else {
          result.value += 1;
        }
      }, this)
    }, this)
  },

  createAnswerEntry: function(answer, key, resultsObject) {
    resultsObject[key].push({
      label: answer,
      value: 1,
      color: coloursArray[resultsObject[key].length].color,
      highlight: coloursArray[resultsObject[key].length].highlight
    })
  }
};
