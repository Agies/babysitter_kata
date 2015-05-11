var moment = require("moment"),
 	calculator = {};
calculator.timeMatch = /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?([A,P,a,p][M,m])?$/;
calculator.minStartTime = 17;
calculator.maxLeaveTime = 4;
calculator.calculate = function(startTime, leaveTime, bedTime) {
	'use strict';
	var parsedStartTime,
		parsedLeaveTime;
	if (!startTime) throw "start time required";
	if (!leaveTime) throw "leave time required";
	if (!bedTime) throw "bed time required";
	parsedStartTime = moment(startTime, "hh:mma");
	parsedLeaveTime = moment(leaveTime, "hh:mma");
	if (!calculator.timeMatch.test(startTime)) throw "start time must be valid";
	if (!calculator.timeMatch.test(leaveTime)) throw "leave time must be valid";
	if (parsedStartTime.hour() < calculator.minStartTime) throw "start time must be after 5PM";
	if (parsedLeaveTime.hour() > calculator.maxLeaveTime &&  parsedLeaveTime.hour() < calculator.minStartTime) throw "leave time must be before 4AM";
	if (parsedStartTime.diff(parsedLeaveTime, 'days') > 1) throw "difference between start time and leave time cannot be more than one day";
};
module.exports = calculator; 