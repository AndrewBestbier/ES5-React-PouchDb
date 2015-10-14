/* Imports */
var PouchDB = require('pouchdb');
var db = new PouchDB('SurveyResults');

var Api = {
  saveSurvey: function(currentlyUsing, interestedUsing, usingES6, yearsExperience) {

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
  }
};

module.exports = Api;
