/* global it, describe, afterEach */

var expect = require('chai').expect;
var format = require('../kpifunctions.js');
var networkData = require('../data/networkData/newData.js');

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
      expect(result).to.be.a.string;
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
      expect(result).to.be.a.string;
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
      expect(result).to.be.a.number;
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
      expect(result).to.be.a.number;
    });
    it('returns the correct number of days', function () {
      expect(result).to.eql(29);
    });
  });
  describe('getYTDTarget', function () {
    var totalTarget = 5000;
    var reportingYear = 365;
    var daysIntoYear = 100;

    var result = format.getYTDTarget(totalTarget, reportingYear, daysIntoYear);
    it('is a function', function () {
      expect(format.getYTDTarget).to.be.a('function');
    });
    it('returns a number', function () {
      expect(result).to.be.a('number');
    });
    it('returns the correct YTD target', function () {
      expect(result).to.eql(1370);
    });
  });
  describe('getYTDPercentage', function () {
    var totalTarget = 5000;
    var YTDTarget = 1370;
    var result = format.getYTDPercentage(totalTarget, YTDTarget);

    it('is a function', function () {
      expect(format.getYTDPercentage).to.be.a('function');
    });
    it('returns a number', function () {
      expect(result).to.be.a.number;
    });
    it('returns the correct percentage, rounded to 1 decimal', function () {
      expect(result).to.eql(27.4);
      expect(format.getYTDPercentage(4600, 300)).to.eql(6.5);
      expect(format.getYTDPercentage(3250, 2000)).to.eql(61.5);
    });
  });
  describe('getTotalPercentage', function () {
    var totalTarget = 200000;
    var totalAchieved = 3000;
    var result = format.getTotalPercentage(totalAchieved, totalTarget);
    it('is a function', function () {
      expect(format.getTotalPercentage).to.be.a('function');
    });
    it('returns a number', function () {
      expect(result).to.be.a('number');
    });
    it('returns the correct percentage, rounded to 1 decimal', function () {
      expect(result).to.eql(1.5);
      expect(format.getTotalPercentage(2800, 65000)).to.eql(4.3);
      expect(format.getTotalPercentage(5400, 87000)).to.eql(6.2);
    });
  });
  describe('getTotalAchieved', function () {
    var networkData = {
      "facebook": {
        "shares": {
          "dailyData": [
            {"network": "facebook", "metric": "shares", "date": 1466380800000, "value": 112}, {
              "network": "facebook",
              "metric": "shares",
              "date": 1466294400000,
              "value": 105
            }, {"network": "facebook", "metric": "shares", "date": 1466208000000, "value": 109}, {
              "network": "facebook",
              "metric": "shares",
              "date": 1466121600000,
              "value": 143
            }, {"network": "facebook", "metric": "shares", "date": 1466035200000, "value": 167}
          ]
        }
      },
      "twitter": {
        "shares": {
          "dailyData": [
            {"network": "twitter", "metric": "shares", "date": 1466380800000, "value": 214}, {
              "network": "twitter",
              "metric": "shares",
              "date": 1466294400000,
              "value": 135
            }, {"network": "twitter", "metric": "shares", "date": 1466208000000, "value": 209}, {
              "network": "twitter",
              "metric": "shares",
              "date": 1466121600000,
              "value": 188
            }, {"network": "twitter", "metric": "shares", "date": 1466035200000, "value": 244}
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
            }, {"network": "instagram", "metric": "comments", "date": 1466035200000, "value": 246}
          ]
        }
      }
    };
    var startDate = 1466294400000; //2016-06-19
    var todaysDate = 1466380800000; //2016-06-20
    var result = format.getTotalAchieved('shares', networkData, startDate, todaysDate);
    it('is a function', function () {
      expect(format.getTotalAchieved).to.be.a('function');
    });
    it('returns the correct total', function () {
      expect(result).to.eql(566);
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
      expect(result).to.eql(1833)
    });
  });
});
