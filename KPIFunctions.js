var moment = require('moment');
var _ = require('lodash');

var format = {};

format.getStartDate = (reportingPeriods) => {
  const startDate = reportingPeriods[0]['begin'];

  return startDate;
};

format.getEndDate = (reportingPeriods) => {
  const endDate = reportingPeriods[reportingPeriods.length - 1]['end'];

  return endDate;
};

format.getReportingYearLength = (reportingPeriods) => {
  const startDate = format.getStartDate(reportingPeriods);
  const endDate = format.getEndDate(reportingPeriods);

  const from = moment(startDate, 'YYYY-MM-DD');
  const to = moment(endDate, 'YYYY-MM-DD');
  const reportingYear = to.diff(from, 'days');

  return reportingYear + 1;
};

format.getDaysIntoReportingYear = (reportingPeriods, currentDate) => {
  const startDate = format.getStartDate(reportingPeriods);

  const from = moment(startDate.toString(), 'YYYY-MM-DD');
  const to = moment(currentDate, 'YYYY-MM-DD');
  const daysIntoYear = to.diff(from, 'days');

  return daysIntoYear + 1;
};

format.getYTDTarget = (totalTarget, reportingYearLength, daysIntoYear) => {
  const YTDTarget = (daysIntoYear / reportingYearLength) * totalTarget;
  return Math.round(YTDTarget);
};

format.getYTDPercentage = (totalTarget, YTDTarget) => {
  const YTDPercentage =  ((YTDTarget / totalTarget) * 100).toFixed(1);
  return +YTDPercentage;
};

format.getTotalPercentage = (totalAchieved, totalTarget) => {
  const totalPercentage =  ((totalAchieved / totalTarget) * 100).toFixed(1);
  return +totalPercentage;
};

format.getTotalAchieved = (metric, networkData, startDate, todaysDate) => {
  let totalAchieved = 0;
  _.each(networkData, function (network) {
    if(network[metric] !== undefined) {
      var dailyData = network[metric]['dailyData'];
      _.each(dailyData, function(day) {
        if(day.date >= startDate && day.date <= todaysDate){
          totalAchieved += day.value;
        }
      });
    }
  });
  return totalAchieved;
};


module.exports = format;

