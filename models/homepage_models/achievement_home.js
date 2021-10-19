const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achieveSchema = new Schema({
    title:{ type:String, required:true},
    body:{ type:String, required:true},
    creation:{ type:Date, default:Date.now },

});
 
Achievement =mongoose.model('achievement',achieveSchema);
module.exports=Achievement;