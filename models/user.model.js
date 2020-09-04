const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_name:{
        type:String
    },
    user_city:{
        type:String
    },
    user_phone: {
        type:Number
    },
    user_address: {
        type:String
    }
});


module.exports = mongoose.model('User',User);