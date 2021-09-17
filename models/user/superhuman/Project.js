const { Schema, model } = require("mongoose")
const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const MyError = require(`${process.cwd()}/helpers/error/MyError`);
const { removeFile } = require(`${process.cwd()}/helpers/file/fsHelper`);

const ProjectSchema = new Schema({
    superhuman: {
        type: Schema.ObjectId,
        ref: "Superhuman"
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    description: {
        type: String,
        required: [true, "please provide a description"]
    },
    url: {
        type: String,
        required: [true, "please provide a url"]
    },
    isOpenSource: Boolean,
    markdownUrl: String,
    document: String,
    contributors: Array,
    dateOfCreate: {
        type: Date,
        default: Date.now()
    }
});

ProjectSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.projects.push(this._id);
        await superhuman.save();
        next();
    } catch (e) {
        next(e);
    }
});

ProjectSchema.pre("remove", async function(next) {
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.projects.splice(superhuman.projects.indexOf(this._id), 1);
        await superhuman.save();

        const { document, markdownUrl } = this;
        if (!!document) {
            let file = `${process.cwd()}/static/uploads/user/project/docs/${document}`;
            removeFile(file);
        }
        if (!!markdownUrl) {
            let file = `${process.cwd()}/static/uploads/user/project/markdown/${markdownUrl}`;
            removeFile(file);
        }
        next();

    } catch (e) {
        next(new MyError("project could not be deleted from user", 400));
    }
});

module.exports = model("Project", ProjectSchema);
