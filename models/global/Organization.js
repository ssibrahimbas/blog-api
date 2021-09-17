const {Schema, model} = require("mongoose")
const MyError = require(`${process.cwd()}/helpers/error/MyError`)
const {removeFile} = require(`${process.cwd()}/helpers/file/fsHelper`)

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    imageUrl: {
        type: String,
        default: "default.jpg"
    },
    webAddress: {
        type: String,
        required: [true, "please provide a web address"]
    }
});

OrganizationSchema.post("remove", function() {
    const imageUrl = this.imageUrl;
    if (imageUrl === "default.jpg") return true;

    const file = `${process.cwd()}/static/uploads/global/${imageUrl}`;

    removeFile(file)
});

module.exports = model("Organization", OrganizationSchema);
