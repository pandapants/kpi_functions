/* global it, describe, afterEach */

var expect = require('chai').expect;
var format = require('../kpifunctions.js');
var networkData = require('../dummyData/networkData/newData.js');

describe('format', function () {
  var reportingPeriods = [
    {
      begin: '2016-06-01',
      end: '2016-06-30'
    },
    {
      begin: '2016-07-01',
      end: '2016-07-31'
    },
    {
      begin: '2016-08-01',
      end: '2016-08-31'
    }
  ];
  describe('getStartDate', function () {
    var result = format.getStartDate(reportingPeriods);

    it('is a function', function () {
      expect(format.getStartDate).to.be.a('function');
    });
    it('returns a string', function () {
      expect(result).to.be.a('string');
    });
    it('returns the correct start date for reporting year', function () {
      expect(result).to.eql('2016-06-01');
    });
  });
  describe('getEndDate', function () {
    var result = format.getEndDate(reportingPeriods);
    it('is a function', function () {
      expect(format.getEndDate).to.be.a('function');
    });
    it('returns a string', function () {
      expect(result).to.be.a('string');
    });
    it('returns the correct end date for reporting year', function () {
      expect(result).to.eql('2016-08-31');
    });
  });
  describe('getReportingYearLength', function () {
    var result = format.getReportingYearLength(reportingPeriods);
    it('is a function', function () {
      expect(format.getReportingYearLength).to.be.a('function');
    });
    it('returns a number', function () {
      expect(result).to.be.a('number');
    });
    it('returns the correct number of days', function () {
      expect(result).to.eql(92);
    });
  });
  describe('getDaysIntoReportingYear', function () {
    var result = format.getDaysIntoReportingYear(reportingPeriods, '2016-06-29');
    it('is a function', function () {
      expect(format.getDaysIntoReportingYear).to.be.a('function');
    });
    it('returns a number', function () {
      expect(result).to.be.a('number');
    });
    it('returns the correct number of days', function () {
      expect(result).to.eql(29);
    });
  });
  describe('getTotalAchieved', function () {
    var networkData = {
      "facebook": {
        "shares": {
          "dailyData": [
            {
              "network": "facebook",
              "metric": "shares",
              "date": 1466380800000,
              "value": 112},
            {
              "network": "facebook",
              "metric": "shares",
              "date": 1466294400000,
              "value": 105
            },
            {
              "network": "facebook",
              "metric": "shares",
              "date": 1466208000000,
              "value": 109},
            {
              "network": "facebook",
              "metric": "shares",
              "date": 1466121600000,
              "value": 143
            },
            {
              "network": "facebook",
              "metric": "shares",
              "date": 1466035200000,
              "value": 167
            }
          ]
        }
      },
      "twitter": {
        "shares": {
          "dailyData": [
            {
              "network": "twitter",
              "metric": "shares",
              "date": 1466380800000,
              "value": 214},
            {
              "network": "twitter",
              "metric": "shares",
              "date": 1466294400000,
              "value": 135
            },
            {
              "network": "twitter",
              "metric": "shares",
              "date": 1466208000000,
              "value": 209},
            {
              "network": "twitter",
              "metric": "shares",
              "date": 1466121600000,
              "value": 188
            },
            {
              "network": "twitter",
              "metric": "shares",
              "date": 1466035200000,
              "value": 244
            }
          ]
        }
      },
      "instagram": {
        "comments": {
          "dailyData": [
            {
              "network": "instagram",
              "metric": "comments",
              "date": 1466380800000,
              "value": 131
            }, {
              "network": "instagram",
              "metric": "comments",
              "date": 1466294400000,
              "value": 165
            }, {
              "network": "instagram",
              "metric": "comments",
              "date": 1466208000000,
              "value": 191
            }, {
              "network": "instagram",
              "metric": "comments",
              "date": 1466121600000,
              "value": 265
            },
            {
              "network": "instagram",
              "metric": "comments",
              "date": 1466035200000,
              "value": 246
            }
          ]
        }
      }
    };
    var startDate = 1466294400000; //2016-06-19
    var todaysDate = 1466380800000; //2016-06-20
    var result1 = format.getTotalAchieved('shares', networkData, startDate, todaysDate);
    var result2 = format.getTotalAchieved('shares', networkData, '2016-06-19', '2016-06-20');
    it('is a function', function () {
      expect(format.getTotalAchieved).to.be.a('function');
    });
    it('returns the correct total when dates passed as timestamps', function () {
      expect(result1).to.eql(566);
    });
    it('returns the correct total when dates passed as strings', function () {
      expect(result2).to.eql(566);
    });
    it('returns the correct total when a network is specified', function () {
      expect(format.getTotalAchieved('shares', networkData, startDate, todaysDate, 'facebook')).to.eql(217);
    });
  });
  describe('getPercentageAchieved', function () {
    var totalTarget = 200000;
    var totalAchieved = 3000;
    var result = format.getPercentageAchieved(totalAchieved, totalTarget);
    it('is a function', function () {
      expect(format.getPercentageAchieved).to.be.a('function');
    });
    it('returns a number', function () {
      expect(result).to.be.a('number');
    });
    it('returns the correct percentage, rounded to 1 decimal', function () {
      expect(result).to.eql(1.5);
      expect(format.getPercentageAchieved(2800, 65000)).to.eql(4.3);
      expect(format.getPercentageAchieved(5400, 87000)).to.eql(6.2);
    });
  });
  describe('getRelevantReportingPeriods', function () {
    var todaysDate = '2016-07-25';
    var expectedResult = [{
      begin: '2016-06-01',
      end: '2016-06-30'
    },
      {
        begin: '2016-07-01',
        end: '2016-07-31'
      }];
    var result = format.getRelevantReportingPeriods(reportingPeriods, todaysDate);
    it('is a function', function () {
      expect(format.getRelevantReportingPeriods).to.be.a('function');
    });
    it('returns an array', function () {
      expect(result).to.be.an('array');
    });
    it('returns only finished or ongoing reporting periods', function () {
      expect(result).to.eql(expectedResult);
    });
  });
  describe('getTotalPeriodTarget', function () {
    var result = format.getTotalPeriodTarget(5500, reportingPeriods)
    it('is a function', function () {
      expect(format.getTotalPeriodTarget).to.be.a('function');
    });
    it('returns the correct period target', function () {
      expect(result).to.eql(1833);
    });
  });
});
