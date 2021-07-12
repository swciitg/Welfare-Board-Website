const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visionSchema = new Schema({
    title:{
        type:String,
        required:true },
    body:{
        type:String,
        required:true
    },    
});


const Vision=mongoose.model('vision',visionSchema);
module.exports=Vision;
