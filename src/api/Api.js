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
}];

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
        window.alert("There was a problem submitting this form");
      } else {
        window.alert("Thanks for your submission");
      }
    });
  },

  getSurveyResults: function() {
    return db.allDocs({
      include_docs: true
    }).then(function(result) {
      var docs = result.rows.map(function (row) {return row.doc;});
      return this.populateResultsObjectWithData(docs);
    }.bind(this));
  },

  createEmptyResultsObject: function(){
      return {
        currentlyUsing: [],
        interestedUsing: [],
        usingES6: [],
        yearsExperience: []
      };
  },

  getResultKey: function (resultsObject, answer, key) {
    var result = _.findWhere(resultsObject[key], {
      label: answer
    });

    if (result) {
      return result;
    }

    return this.createAnswerEntry(answer, key, resultsObject);
  },

  populateResultsObjectWithData: function(docs) {
    _.reduce(docs, function (resultsObject, doc) {
      _.each(resultsObject, function(array, key) {
        var answer = doc[key];

        var result = this.getResultKey(resultsObject, answer, key);
        result.value += 1;

      }, this);

      return resultsObject;
    }, this.createEmptyResultsObject());
  },

  createAnswerEntry: function(answer, key, resultsObject) {
    var result = {
      label: answer,
      value: 0,
      color: coloursArray[resultsObject[key].length].color,
      highlight: coloursArray[resultsObject[key].length].highlight
    };

    resultsObject[key].push(result);
    return result;
  }
};
