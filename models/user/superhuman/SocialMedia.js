const { Schema, model } = require("mongoose")
const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);

const SocialMediaSchema = new Schema({
    superhuman: {
        type: Schema.ObjectId,
        ref: "Superhuman"
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    organization: {
        type: Schema.ObjectId,
        ref: "Organization"
    },
    url: {
        type: String,
        required: [true, "please provide a title"]
    }
});

SocialMediaSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.socialMedias.push(this._id);
        await superhuman.save();
        next();
    } catch (e) {
        next(e);
    }
});

SocialMediaSchema.pre("remove", async function(next) {
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.socialMedias.splice(
            this.superhuman.socialMedias.indexOf(this._id),
            1
        );
        await superhuman.save();
        next()
    } catch (e) {
        next(e)
    }
});

module.exports = model("SocialMedia", SocialMediaSchema);
