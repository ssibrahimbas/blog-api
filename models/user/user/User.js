const { Schema, model } = require("mongoose")

const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const options = { discriminatorKey: "kind" };

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide a firstName"]
        },
        lastName: {
            type: String,
            required: [true, "Please provide a lastName"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "please provide a valid mail"
            ]
        },
        password: {
            type: String,
            minlength: 8,
            required: [true, "Please provide a password"]
        },
        dateOfSignUp: {
            type: Date,
            default: Date.now
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        active: {
            type: Boolean,
            default: true
        }
    },
    options
);

UserSchema.methods.getTokenFromUserModel = function() {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        Id: this._id,
        firstName: this.firstName,
        lastName: this.lastName
    };
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
};

UserSchema.methods.getResetPasswordToken = function() {
    const randomHexString = crypto.randomBytes(15).toString("hex");

    const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(randomHexString)
        .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire =
        Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE);
    return resetPasswordToken;
};

UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

module.exports = model("User", UserSchema);
