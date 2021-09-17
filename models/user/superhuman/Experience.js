const { Schema, model } = require("mongoose")
const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);

const ExperienceSchema = new Schema({
    superhuman: {
        type: Schema.ObjectId,
        ref: "Superhuman"
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    employmentType: {
        type: Schema.ObjectId,
        ref: "Employment"
    },
    organization: {
        type: Schema.ObjectId,
        ref: "Organization"
    },
    location: String,
    dateOfStarted: Date,
    dateOfEnded: Date,
    active: Boolean,
    sector: String,
    description: String
});

ExperienceSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();

    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.experiences.push(this._id);
        await superhuman.save();
        next();
    } catch (e) {
        next(e);
    }
});

ExperienceSchema.pre("remove", async function(next) {
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.experiences.splice(superhuman.experiences.indexOf(this._id), 1);
        await superhuman.save();
        next()
    } catch (e) {
        next(e)
    }
});

module.exports = model("Experience", ExperienceSchema);
