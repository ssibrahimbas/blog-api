const {Schema, model} = require("mongoose")
const MyError = require(`${process.cwd()}/helpers/error/MyError`);
const Evaluation = require(`${process.cwd()}/models/post/Evaluation`);

const AnswerSchema = new Schema({
    title: {
        type: String,
        minlength: [8, "please enter more then 8 characters"],
        maxlength: [36, "please enter less then 36 characters"],
        required: [true, "please provide a title"]
    },
    content: {
        type: String,
        minlength: [8, "please enter more then 8 characters"],
        maxlength: [500, "please enter less then 500 characters"],
        required: [true, "please provide a content"]
    },
    author: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    evaluation: {
        type: Schema.ObjectId,
        ref: "Evaluation",
        required: true
    },
    dateOfCreate: {
        type: Date,
        default: Date.now
    }
});

AnswerSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();
    try {
        const evaluation = await Evaluation.findById(this.evaluation);
        evaluation.answer = this._id;
        await evaluation.save();
        next();
    } catch (err) {
        new MyError("An error occurred while saving the answer", 400);
    }
});

AnswerSchema.post("remove", async function() {
    try {
        const evaluation = await Evaluation.findById(this.evaluation);
        evaluation.answer = null;
        await evaluation.save();
    } catch (err) {
        throw new MyError("An error occurred while removing the answer", 400);
    }
});

module.exports = model("Answer", AnswerSchema);
