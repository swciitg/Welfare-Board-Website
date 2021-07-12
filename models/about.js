const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const aboutSchema= new Schema({
    title:{
        type:String,
        required:true },
    body:{
        type:String,
        required:true
    },    
});

const About=mongoose.model('about',aboutSchema);
module.exports=About;
