/* global it, describe, afterEach */

var expect = require('chai').expect;
var format = require('../kpifunctions.js');


// networkData has daily data for period 2016-01-23 - 2016-06-20

// want to get:
// totalAchieved: 4432,
// totalPercent: 17,
// YTDTarget: 18000,
// YTDPercent: 30

describe('format', function () {
  var reportingPeriods = [
    {
      begin: '2016-06-01',
      end: '2016-06-30'
    },
    {
      begin: '2016-07-01',
      end:'2016-07-31'
    },
    {
      begin: '2016-08-01',
      end: '2016-08-31'
    }
  ];
  describe('getStartDate', function () {
    var result = format.getStartDate(reportingPeriods);

    it('is a function', function () {
      expect(format.getStartDate).to.be.a.function;
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
      expect(format.getEndDate).to.be.a.function;
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
      expect(format.getReportingYearLength).to.be.a.function;
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
      expect(format.getDaysIntoReportingYear).to.be.a.function;
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
      expect(format.getYTDTarget).to.be.a.function;
    });
    it('returns a number', function () {
      expect(result).to.be.a.number;
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
      expect(format.getYTDPercentage).to.be.a.function;
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
      expect(format.getTotalPercentage).to.be.a.function;
    });
    it('returns a number', function () {
      expect(result).to.be.a.number;
    });
    it('returns the correct percentage, rounded to 1 decimal', function () {
      expect(result).to.eql(1.5);
      expect(format.getTotalPercentage(2800, 65000)).to.eql(4.3);
      expect(format.getTotalPercentage(5400, 87000)).to.eql(6.2);
    });
  });
  
});
