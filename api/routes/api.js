// const functions = require('../utils');
// const _ = require('lodash');
// const JWT = require('jsonwebtoken');
const secret= require ('../dbconfig/secrets');
const Users = require('../models/users');
const Attendance = require('../models/attendance');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_APIKEY);
const Promise = require('bluebird');
const functions = require('../utils');
const _ = require('lodash');





module.exports = (express)=>{

    const api = Promise.promisifyAll(express.Router());

    require('./auth')(api, Users, functions,_)
    require('./search')(api , Users, functions,client, Attendance,_)

    return api;
}