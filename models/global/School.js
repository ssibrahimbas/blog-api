const {Schema, model} = require("mongoose")
const {removeFile} = require(`${process.cwd()}/helpers/file/fsHelper`)

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },
    imageUrl: {
        type: String,
        default: "default.jpg"
    }
});

SchoolSchema.post("remove", function() {
    const imageUrl = this.imageUrl;
    if (imageUrl === "default.jpg") return true;

    const file = `${process.cwd()}/static/uploads/global/school/${imageUrl}`;
    removeFile(file)
});

module.exports = model("School", SchoolSchema);