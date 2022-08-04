var express = require('express');
var moment = require('moment');
var time = {};


time.getMonthYear =  () => {
    let current_time = moment().format('x');
    let date_now = moment(current_time, 'x').format('YYYY-MM');
    return date_now;
};

time.getDate =  () => {
    let current_time = moment().format('x');
    let date_now = moment(current_time, 'x').format('DD');
    return date_now;
};

time.timeInstance =  () => {
    let current_time = moment().format('x');
    return current_time;
};

time.fullTime =  () => {
    let current_time = moment().format('x');
    let date_now = moment(current_time, 'x').format('YYYYMMDD_HHmmss');
    return date_now;
};



module.exports = time;
