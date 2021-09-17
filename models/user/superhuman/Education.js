const { Schema, model } = require("mongoose")
const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);

const EducationSchema = new Schema({
    superhuman: {
        type: Schema.ObjectId,
        ref: "Superhuman"
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    school: {
        type: Schema.ObjectId,
        ref: "School"
    },
    degree: String,
    program: String,
    dateOfStarted: Date,
    dateOfEnded: Date,
    note: String,
    activityAndCommunities: String,
    description: String
});

EducationSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();

    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.educations.push(this._id);
        await superhuman.save();
        next();
    } catch (e) {
        next(e);
    }
});

EducationSchema.pre("remove", async function(next) {
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.educations.splice(superhuman.educations.indexOf(this._id), 1);
        await superhuman.save();
        next()
    } catch (e) {
        next(e)
    }
});

module.exports = model("Education", EducationSchema);
