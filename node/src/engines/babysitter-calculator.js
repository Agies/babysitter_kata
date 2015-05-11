var moment = require("moment"),
 	calculator = {};
calculator.minStartTime = 17;
calculator.maxLeaveTime = 4;
calculator.calculate = function(startTime, leaveTime) {
	'use strict';
	var parsedStartTime,
		parsedLeaveTime;
	if (!startTime) throw "start time required";
	if (!leaveTime) throw "start time required";
	parsedStartTime = moment(startTime, "hh:mma");
	parsedLeaveTime = moment(leaveTime, "hh:mma");
	if (parsedStartTime.hour() == 0) throw "start time must be valid";
	if (parsedLeaveTime.hour() == 0) throw "leave time must be valid";
	if (parsedStartTime.hour() < calculator.minStartTime) throw "start time must be after 5PM";
	if (parsedLeaveTime.hour() > calculator.maxLeaveTime &&  parsedLeaveTime.hour() < calculator.minStartTime) throw "leave time must be before 4AM";
	if (parsedStartTime.diff(parsedLeaveTime, 'days') > 1) throw "difference between start time and leave time cannot be more than one day";
};
module.exports = calculator;