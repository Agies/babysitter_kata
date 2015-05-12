var moment = require("moment"),
 	calculator = {};
calculator.timeMatch = /^(([0-1]?[0-9])|([2][0-8])):([0-5]?[0-9])(:([0-5]?[0-9]))?([A,P,a,p][M,m])?$/;
calculator.minStartTime = 17;
calculator.maxLeaveTime = 4;
calculator.beforeBedtimePayment = 12;
calculator.bedtimeToMidnightPayment = 8;
calculator.afterMidnightPayment = 16;
calculator.calculate = function(startTime, leaveTime, bedTime) {
	'use strict';
	var parsedStartTime,
		parsedLeaveTime,
		parsedBedTime,
		beforeBedTime,
		midnight = moment("24:00", "hh:mma"),
		beforeBedTimeAmount,
		afterBedTimeBeforeMidnight,
		afterBedTimeBeforeMidnightAmount,
		afterMidnight = 0,
		afterMidnightAmount = 0;
	if (!startTime) throw "start time required";
	if (!leaveTime) throw "leave time required";
	if (!bedTime) throw "bed time required";
	parsedStartTime = moment(startTime, "hh:mma");
	parsedLeaveTime = moment(leaveTime, "hh:mma");
	parsedBedTime = moment(bedTime, "hh:mma");
	if (!calculator.timeMatch.test(startTime)) throw "start time must be valid";
	if (!calculator.timeMatch.test(leaveTime)) throw "leave time must be valid";
	if (!calculator.timeMatch.test(bedTime)) throw "bed time must be valid";
	if (parsedStartTime.hour() < calculator.minStartTime) throw "start time must be after 5PM";
	if (parsedLeaveTime.hour() > calculator.maxLeaveTime &&  parsedLeaveTime.hour() < calculator.minStartTime) throw "leave time must be before 4AM";
	if (parsedLeaveTime.diff(parsedStartTime, 'days') > 1) throw "difference between start time and leave time cannot be more than one day";
	
	beforeBedTime = parsedBedTime.diff(parsedStartTime, 'hours');
	beforeBedTimeAmount = beforeBedTime > 0 ? (beforeBedTime * calculator.beforeBedtimePayment) : 0;
	
	afterBedTimeBeforeMidnight = moment.min(parsedLeaveTime, midnight).diff(parsedBedTime, 'hours');
	afterBedTimeBeforeMidnightAmount = afterBedTimeBeforeMidnight > 0 ? (afterBedTimeBeforeMidnight * calculator.bedtimeToMidnightPayment) : 0;
	
	afterMidnight = parsedLeaveTime.diff(midnight, "hours");
	afterMidnightAmount = afterMidnight > 0 ? (afterMidnight * calculator.afterMidnightPayment) : 0;
	
	console.log({
		before: {diff: beforeBedTime, amount: beforeBedTimeAmount},
		after: {diff: afterBedTimeBeforeMidnight, amount: afterBedTimeBeforeMidnightAmount},
		midnight: {diff:afterMidnight, amount: afterMidnightAmount}
	});
	return beforeBedTimeAmount + afterBedTimeBeforeMidnightAmount + afterMidnightAmount; 
};
module.exports = calculator; 