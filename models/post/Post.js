const {Schema, model} = require("mongoose")
const slugify = require("slugify")

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    shortDescription: {
        type: String,
        maxlength: [360, "please enter less then 360 characters"],
        minlength: [100, "please enter more than 100 characters"],
        required: [true, "Please provide a shortDescription"]
    },
    slug: String,
    imageUrl: {
        type: String,
        default: "default.jpg"
    },
    dateOfCreate: {
        type: Date,
        default: Date.now()
    },
    hashtags: [
        {
            type: String,
            required: false
        }
    ],
    markdownUrl: {
        type: String,
        default: "default.md"
    },
    document: String,
    author: {
        type: Schema.ObjectId,
        ref: "User"
    },
    countOfEvaluation: {
        type: Number,
        default: 0
    },
    evaluations: [
        {
            type: Schema.ObjectId,
            ref: "Evaluation"
        }
    ],
    active: {
        type: Boolean,
        default: false
    }
});

PostSchema.pre("save", function(next) {
    if (!this.isModified("title")) return next();

    this.slug = this.makeSlug();
    next();
});

PostSchema.methods.makeSlug = function() {
    return slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });
};

module.exports = model("Post", PostSchema);
