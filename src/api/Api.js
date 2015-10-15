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

    return new Promise(function(resolve, reject) {

      db.allDocs({
        include_docs: true
      }).then(function(result) {

        //Reducing the array of result objects into a single object in the required format of Chart.js
        return _.reduce(result.rows, function(object, row) {

          //Looping through the keys of 'currentlyUsing', 'interestedUsing' etc
          Object.keys(resultsObject).forEach(function(key) {

            //Finding if the particular survey answer already exists in the respective category in our new object already
            var result = _.findWhere(resultsObject[key], {
              label: row.doc[key]
            });

            //If the answer does not exist in this category, then it is pushed. If it does exist, it's value is incremented.
            if (!result) {
              //The colours are defined at the top of this module. If these colours are not defined, Chart.js does not function.
              resultsObject[key].push({
                label: row.doc[key],
                value: 1,
                color: coloursArray[resultsObject[key].length].color,
                highlight: coloursArray[resultsObject[key].length].highlight
              })
            } else {
              result.value += 1;
            }
          })
          return resolve(object);
        }, resultsObject)
      })
    })
  },
};

module.exports = Api;
