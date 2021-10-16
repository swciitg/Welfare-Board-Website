const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const teamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    category: { type: String, required: true },
    
   
    
});
 
const Team =mongoose.model('team', teamSchema);
module.exports= Team;