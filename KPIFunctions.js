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

  const from = moment(startDate, 'YYYY-MM-DD');
  const to = moment(currentDate, 'YYYY-MM-DD');
  const daysIntoYear = to.diff(from, 'days');

  return daysIntoYear + 1;
};

format.getYTDTarget = (totalYearlyTarget, reportingYearLength, daysIntoYear) => {
  const YTDTarget = (daysIntoYear / reportingYearLength) * totalYearlyTarget;
  return Math.round(YTDTarget);
};

format.getTotalAchieved = (metric, networkData, startDate, todaysDate, network) => {
  let totalAchieved = 0;

  if(network !== undefined) {
    network = network.toLowerCase();
    if(networkData[network][metric] !== undefined) {
      let networkSpecificData = networkData[network][metric]['dailyData'];
      return format.getNetworkTotal(networkSpecificData, startDate, todaysDate);
    } else {
      return 'Metric does not exist for selected network';
    }
  }
  _.each(networkData, (network) => {
    if(network[metric] !== undefined) {
      var dailyData = network[metric]['dailyData'];
      totalAchieved += format.getNetworkTotal(dailyData, startDate, todaysDate);
    }
  });
  return totalAchieved;
};

format.getNetworkTotal = (dailyDataForMetric, startDate, todaysDate) => {
  let achieved = 0;
  startDate = moment.utc(startDate);
  todaysDate = moment.utc(todaysDate);

  _.each(dailyDataForMetric, function(day) {
    let date = moment.utc(day.date);
    if(date.isSameOrAfter(startDate) && date.isSameOrBefore(todaysDate)){
      achieved += day.value;
    }
  });
  return achieved;
};

format.getPercentageAchieved = (achieved, target) => {
  const percentage =  ((achieved / target) * 100).toFixed(1);
  return +percentage;
};

format.getRelevantReportingPeriods = (reportingPeriods, todaysDate) => {
  const today = moment.utc(todaysDate, 'YYYY-MM-DD');
  const relevantReportingPeriods = _.reduce(reportingPeriods, (memo, obj) => {
    const startDate = moment(obj.begin, 'YYYY-MM-DD');
    if(moment(startDate).isBefore(today)) {
      memo.push(obj);
    }
    return memo;
  }, []);
  return relevantReportingPeriods;
};

format.getTotalPeriodTarget = (totalYearlyTarget, reportingPeriods) => {
  return Math.round(totalYearlyTarget / reportingPeriods.length);
};

module.exports = format;

