const {Schema, model} = require("mongoose")
const Post = require(`${process.cwd()}/models/post/Post`);

const EvaluationSchema = new Schema({
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
    post: {
        type: Schema.ObjectId,
        ref: "Post",
        required: true
    },
    answer: {
        type: Schema.ObjectId,
        ref: "Answer"
    },
    senderName: {
        type: String,
        required: [true, "please provide a sender name"]
    },
    senderEmail: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "please provide a valid mail"
        ]
    },
    dateOfCreate: {
        type: Date,
        default: Date.now
    }
});

EvaluationSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();
    try {
        const post = await Post.findById(this.post);
        post.evaluations.push(this._id);
        post.countOfEvaluation++;
        await post.save();
        next();
    } catch (err) {
        next("An error was encountered while saving the comment.");
    }
});

EvaluationSchema.post("remove", async function() {
    try {
        const post = await Post.findById(this.post);
        post.evaluations.splice(post.evaluations.indexOf(this._id), 1);
        post.countOfEvaluation--;
        await post.save();
    } catch (err) {
        throw new Error("An error was encountered while removing the comment.");
    }
});

module.exports = model("Evaluation", EvaluationSchema);
