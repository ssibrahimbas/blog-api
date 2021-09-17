const {Schema, model} = require("mongoose")

const EmploymentSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    }
});

module.exports = model("Employment", EmploymentSchema);
