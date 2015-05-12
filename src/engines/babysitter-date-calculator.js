var moment = require("moment"),
 	calculator = {};
calculator.timeMatch = /^(((((0[13578])|([13578])|(1[02]))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(3[01])))|((([469])|(11))[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9])|(30)))|((02|2)[\-\/\s]?((0[1-9])|([1-9])|([1-2][0-9]))))[\-\/\s]?\d{4})(\s(((0[1-9])|([1-9])|([0-9][0-9]))\:([0-5][0-9])(()|(\:([0-5][0-9])))([AM|PM|am|pm]{2,2})?))?$/;
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
		midnight = moment(startTime, 'MM/DD/YYYY hh:mma').add(1, 'd').startOf('day'),
		beforeBedTimeAmount,
		afterBedTimeBeforeMidnight,
		afterBedTimeBeforeMidnightAmount,
		afterMidnight = 0,
		afterMidnightAmount = 0;
	if (!startTime) throw "start time required";
	if (!leaveTime) throw "leave time required";
	if (!bedTime) throw "bed time required";
	parsedStartTime = moment(startTime, 'MM/DD/YYYY hh:mma');
	parsedLeaveTime = moment(leaveTime, 'MM/DD/YYYY hh:mma');
	parsedBedTime = moment(bedTime, 'MM/DD/YYYY hh:mma');
	if (!calculator.timeMatch.test(startTime)) throw "start time must be valid";
	if (!calculator.timeMatch.test(leaveTime)) throw "leave time must be valid";
	if (!calculator.timeMatch.test(bedTime)) throw "bed time must be valid";
	if (parsedStartTime.hour() < calculator.minStartTime) throw "start time must be after 5PM";
	if (parsedLeaveTime.diff(midnight, 'hours') > calculator.maxLeaveTime) throw "leave time must be before 4AM";
	if (parsedLeaveTime.diff(parsedStartTime, 'days') > 1) throw "difference between start time and leave time cannot be more than one day";
	
	beforeBedTime = parsedBedTime.diff(parsedStartTime, 'hours');
	beforeBedTimeAmount = beforeBedTime > 0 ? (beforeBedTime * calculator.beforeBedtimePayment) : 0;
	
	afterBedTimeBeforeMidnight = moment.min(parsedLeaveTime, midnight).diff(parsedBedTime, 'hours');
	afterBedTimeBeforeMidnightAmount = afterBedTimeBeforeMidnight > 0 ? (afterBedTimeBeforeMidnight * calculator.bedtimeToMidnightPayment) : 0;
	
	afterMidnight = parsedLeaveTime.diff(midnight, "hours");
	afterMidnightAmount = afterMidnight > 0 ? (afterMidnight * calculator.afterMidnightPayment) : 0;
	
	console.log({
		parsedStart: parsedStartTime.format(),
		parseLeaveTime: parsedLeaveTime.format(),
		parsedBedTime: parsedBedTime.format(),
		midnight: midnight.format(),
		before: {diff: beforeBedTime, amount: beforeBedTimeAmount},
		after: {diff: afterBedTimeBeforeMidnight, amount: afterBedTimeBeforeMidnightAmount},
		afterMidnight: {diff:afterMidnight, amount: afterMidnightAmount}
	});
	return beforeBedTimeAmount + afterBedTimeBeforeMidnightAmount + afterMidnightAmount; 
};
module.exports = calculator; 