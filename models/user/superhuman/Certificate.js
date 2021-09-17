const { Schema, model } = require("mongoose")
const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const { removeFile } = require(`${process.cwd()}/helpers/file/fsHelper`);

const CertificateSchema = new Schema({
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
    dateOfReceipt: {
        type: Date,
        required: true
    },
    document: String,
    dateOfExpiration: Date,
    isNoExpirationDate: Boolean,
    qualificationId: String,
    qualificationUrl: String
});

CertificateSchema.pre("save", async function(next) {
    if (!this.isModified("title")) return next();
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.certificates.push(this._id);
        await superhuman.save();
        next();
    } catch (err) {
        next(err);
    }
});

CertificateSchema.pre("remove", async function(next) {
    try {
        const superhuman = await SuperHuman.findById(this.superhuman);
        superhuman.certificates.splice(superhuman.educations.indexOf(this._id), 1);
        await superhuman.save();

        const document = this.document;
        if (!!!document) return next()
        let file = `${process.cwd()}/static/uploads/user/certificate/${document}`;
        removeFile(file)

        next()
    } catch (e) {
        next(e)
    }
});

module.exports = model("Certificate", CertificateSchema);
