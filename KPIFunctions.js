var moment = require('moment');

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
  var YTDTarget = (daysIntoYear / reportingYearLength) * totalTarget;
  return Math.round(YTDTarget);
};

format.getYTDPercentage = (totalTarget, YTDTarget) => {
  var YTDPercentage =  ((YTDTarget / totalTarget) * 100).toFixed(1);
  return +YTDPercentage;
};

format.getTotalPercentage = (totalAchieved, totalTarget) => {
  var totalPercentage =  ((totalAchieved / totalTarget) * 100).toFixed(1);
  return +totalPercentage;
};

format.getTotalAchieved = (metric, networkData, startDate, todaysDate) => {
// this.props.state.networkData.[network].[metric].dailyData
// each metric currently contains a dailyDataArray of 600 days

//based on start date and today's date get relevant data under networkData....
};


module.exports = format;

