const mongoose = require("mongoose")

const PartShema = new mongoose.Schema({
    name_of_part:String,
    carname: String,
    model: String,
    year: Number
})

const UserModel = mongoose.model('parts', PartShema)
module.exports = UserModel