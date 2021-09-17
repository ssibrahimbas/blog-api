const { Schema } = require("mongoose")
const User = require(`${process.cwd()}/models/user/user/User`)

const options = { discriminatorKey: "kind" };

const SuperHumanSchema = new Schema(
    {
        description: {
            type: String,
            required: [true, "please provide a description"]
        },
        about: String,
        abilities: [
            {
                type: String
            }
        ],
        socialMedias: [
            {
                type: Schema.ObjectId,
                ref: "SocialMedia"
            }
        ],
        experiences: [
            {
                type: Schema.ObjectId,
                ref: "Experience"
            }
        ],
        educations: [
            {
                type: Schema.ObjectId,
                ref: "Education"
            }
        ],
        projects: [
            {
                type: Schema.ObjectId,
                ref: "Project"
            }
        ],
        certificates: [
            {
                type: Schema.ObjectId,
                ref: "Certificate"
            }
        ],
        dateOfBirth: Date,
        profileImage: {
            type: String,
            default: "default.jpg"
        },
        isAdmin: {
            type: Boolean,
            default: true
        }
    },
    options
);

module.exports = User.discriminator("SuperHuman", SuperHumanSchema);
