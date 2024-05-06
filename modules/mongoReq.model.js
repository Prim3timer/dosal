const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mongoReqSchema = new Schema({
    log: {type: String, required: true},
})
const MongoReq = mongoose.model('MongoReq', mongoReqSchema)
module.exports = MongoReq