var moment = require("moment"),
 	calculator = {};
calculator.calculate = function(startTime, leaveTime) {
	'use strict';
	var parsedStartTime;
	if (!startTime) throw "start time required";
	if (!leaveTime) throw "start time required";
	parsedStartTime = moment(startTime, "hh:mma");
	if (parsedStartTime.hour() == 0) throw "start time must be valid";
	if (parsedStartTime.hour() < 17) throw "start time must be after 5PM";
};
module.exports = calculator;