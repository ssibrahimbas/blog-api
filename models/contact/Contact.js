const { Schema, model } = require("mongoose")

const {removeFile} = require(`${process.cwd()}/helpers/file/fsHelper`)

const ContactSchema = new Schema({
    sender: String,
    senderEmail: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "please provide a valid mail"
        ]
    },
    receiver: {
        type: Schema.ObjectId,
        ref: "SuperHuman"
    },
    dateOfCreate: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    subject: {
        type: String,
        required: [true, "please provide a subject"]
    },
    content: {
        type: String,
        required: [true, "please provide a content"]
    },
    images: [
        {
            type: String
        }
    ]
});

ContactSchema.post("remove", function() {
    const images = this.images;
    if (images.length === 0) return true;

    images.forEach(image => {
        let file = `${process.cwd()}/static/uploads/contact/${image}`;
        removeFile(file)
    });
});

module.exports = model("Contact", ContactSchema);
