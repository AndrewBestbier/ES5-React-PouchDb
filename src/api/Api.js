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

    db.post(submission, function callback(err, result) {
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
      /* Slimming down the result array of objects to only show the relevent data */
      var docs = result.rows.map(function (row) {return row.doc;});
      return this.convertRawDataToChartJsFormat(docs);
    }.bind(this));
  },

  convertRawDataToChartJsFormat: function(docs) {

    /*
     * Underscore's reduce is used, starting with the basis of the scaffolding of the required Chartjs object
     * The first loop (reduce) is through the rows returned from PouchDB. The second nested loop is through the object properties
     */
    return _.reduce(docs, function (resultsObject, doc) {
      _.each(resultsObject, function(array, key) {
        var answer = doc[key];

        /* getResultKey() finds the answer in the resultsObject and returns it. If it does not exist, it is created */
        var result = this.getResultKey(resultsObject, answer, key);
        result.value += 1;
      }, this);

      return resultsObject;
    }, this.createEmptyResultsObject(), this);
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

  createEmptyResultsObject: function(){
      return {
        currentlyUsing: [],
        interestedUsing: [],
        usingES6: [],
        yearsExperience: []
      };
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
