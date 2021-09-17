const bcrypt = require("bcryptjs")
const User = require(`${process.cwd()}/models/user/user/User`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);
const MyError = require(`${process.cwd()}/helpers/error/MyError`);

const login = errorWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!validateInput(email, password))
        next(new MyError("Please check your inputs", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !checkPassword(password, user.password))
        next(new MyError("Please check your credentials", 404));

    sendTokenToClient(user, res, 200);
});

const logout = errorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;

    return res
        .status(200)
        .cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "production"
        })
        .json({
            success: true,
            message: "Logout Successful"
        });
});

const validateInput = (email, password) => email && password;

const checkPassword = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

const sendTokenToClient = (user, res, status) => {
    const token = user.getTokenFromUserModel();
    const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;

    return res
        .status(status)
        .cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
            secure: NODE_ENV === "production"
        })
        .json({
            success: true,
            token,
            data: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};

module.exports = {
    login,
    logout
};
