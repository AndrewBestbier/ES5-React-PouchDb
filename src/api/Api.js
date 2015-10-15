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

    //GN You don't need this new Promise here because allDocs returns a promise.
    //So instead you can do something like this
    /*
      return db.allDocs()
        .then(
        //Process results and return them
      );

    */
    return new Promise(function(resolve, reject) {

      db.allDocs({
        include_docs: true
      }).then(function(result) {

        //Reducing the array of result objects into a single object in the required format of Chart.js

        //GN: Instead of having comments here. Rather break all of this into smaller methods that you can call.
        // so the only thing that should be in this `then` function is a another function called convertResultToChartFormat
        // then you can decide how to break this up further. But this is looking much better than before.
        // what is also nice with smaller functions is that they are much easier to test in isolation. You can give the `convertResultsToChartFormat`
        //some dummy data and make sure it converts correctly. It doesn't matter where the data comes from. So you then are decoupling the conversion away from PouchDB.


        //You are not using reduce correctly here. The idea around reduce is that you iterate over something to build something new
        //What is happening here is that you are iterating over rows. But then your reduce returns a resolved promise which doesn't make sense

        //Lets break down what you want to do here and then you can rething this looping.
        //Loop over each row in the all docs - forEach
        //Sum each survey answer - forEach
        //This is an optional step but might make it easier. Convert the summed survey results into the format for the chart.js

        //Use forEach. Write some tests for this like I've mentioned above and then we can iterate from their.
        return _.reduce(result.rows, function(object, row) {

          //Looping through the keys of 'currentlyUsing', 'interestedUsing' etc
          Object.keys(resultsObject).forEach(function(key) {

            //Finding if the particular survey answer already exists in the respective category in our new object already
            var result = _.findWhere(resultsObject[key], {
              label: row.doc[key]
            });

            //If the answer does not exist in this category, then it is pushed. If it does exist, it's value is incremented.
            //GN: This can be its own function `createResultsObject`
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
