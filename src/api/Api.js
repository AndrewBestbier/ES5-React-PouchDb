/* Imports */
var PouchDB = require('pouchdb');
var db = new PouchDB('SurveyResults');
var _ = require('underscore');

var resultsObject = {
  currentlyUsing: {},
  interestedUsing: {},
  usingES6: {},
  yearsExperience: {}
};

var Api = {
  saveSurvey: function(currentlyUsing, interestedUsing, usingES6, yearsExperience) {

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

    return new Promise(function(reject, resolve) {


      db.allDocs({
        include_docs: true
      }).then(function(result) {
        return _.reduce(result.rows, function(object, row) {

          Object.keys(resultsObject).forEach(function(key) {
            if (!object[key][row.doc[key]]) {
              object[key][row.doc[key]] = 1
            } else {
              object[key][row.doc[key]] += 1;
            }
          })

          return object;
        }, resultsObject)
      }).then(function(resultantObject) {

        /*
        var wild = Object.keys(resultantObject).map(function(key) {
          console.log(key);
          //_.values(obj)
          return resultantObject[key]
        });  */



        //console.log(wild);
        return resolve(resultantObject);
      });

    })
  },

};

module.exports = Api;
