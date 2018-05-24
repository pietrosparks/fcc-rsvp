const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const attendanceSchema = Schema({
   attending:{
       type: Object,
       default:{}
   },
},{ minimize: false })

module.exports = Mongoose.model('Attendance', attendanceSchema);