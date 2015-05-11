var moment = require("moment"),
 	calculator = {};
calculator.minStartTime = 17;
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
};
module.exports = calculator;