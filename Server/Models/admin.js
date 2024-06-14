const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
  },
  location: {
    type: {
        type:String,
        enum:['Point'],
        required: true
    },
    coordinates: {
        type:[Number],
        required:true
    }
  },
});
User.index({location: "2dsphere"});
module.exports = mongoose.model("User", User);
