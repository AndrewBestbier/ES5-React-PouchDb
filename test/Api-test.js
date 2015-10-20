var assert = require('assert');
var Api = require('../src/api/Api');

var testInput = [{
  "currentlyUsing": "react",
  "interestedUsing": "react",
  "usingES6": "no",
  "yearsExperience": 2,
  "_id": "2015-10-15T07:09:49.790Z",
  "_rev": "1-93e413f1a7150a949456ffff30199b1a"
}, {
  "currentlyUsing": "angular",
  "interestedUsing": "angular",
  "usingES6": "yes",
  "yearsExperience": 1,
  "_id": "2015-10-15T07:10:07.530Z",
  "_rev": "1-6fb4bcee704d66c440ab8f3b4de90d21"
}, {
  "currentlyUsing": "angular",
  "interestedUsing": "angular",
  "usingES6": "yes",
  "yearsExperience": 1,
  "_id": "D5DC8E23-B943-BC4B-ABA7-0929AFD1C072",
  "_rev": "1-d926ed1a3727582213a7b6e0e48ae538"
}];

var expectedResult = {
  currentlyUsing: [{
    label: 'react',
    value: 1,
    color: '#F7464A',
    highlight: '#FF5A5E'
  }, {
    label: 'angular',
    value: 2,
    color: '#46BFBD',
    highlight: '#5AD3D1'
  }],
  interestedUsing: [{
    label: 'react',
    value: 1,
    color: '#F7464A',
    highlight: '#FF5A5E'
  }, {
    label: 'angular',
    value: 2,
    color: '#46BFBD',
    highlight: '#5AD3D1'
  }],
  usingES6: [{
    label: 'no',
    value: 1,
    color: '#F7464A',
    highlight: '#FF5A5E'
  }, {
    label: 'yes',
    value: 2,
    color: '#46BFBD',
    highlight: '#5AD3D1'
  }],
  yearsExperience: [{
    label: 2,
    value: 1,
    color: '#F7464A',
    highlight: '#FF5A5E'
  }, {
    label: 1,
    value: 2,
    color: '#46BFBD',
    highlight: '#5AD3D1'
  }]
}

describe('Api', function() {
  describe('Converting Results to usable ChartJs Object ', function() {
    it('should return the desired specified output when given the respective input', function() {
      var result = Api.convertRawDataToChartJsFormat(testInput);
      assert.deepEqual(result, expectedResult);
    });
  });
});
