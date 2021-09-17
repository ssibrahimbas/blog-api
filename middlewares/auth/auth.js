const jwt = require("jsonwebtoken")

const {errorWrapper} = require(`${process.cwd()}/helpers/error/errorWrapper`)
const MyError = require(`${process.cwd()}/helpers/error/MyError`)
const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);

const getAccessToRoute = errorWrapper(async (req, res, next) => {
    if (!isTokenIncluded(req))
        next(new MyError("You area not authorized to access this page", 403));

    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err)
            return next(
                new MyError("You are not authorized to access this page", 401)
            );

        req.user = {
            Id: decodedToken.Id,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName
        };
        next();
    });
});

const getSuperhumanAccess = errorWrapper(async (req, res, next) => {
    const superhuman = await SuperHuman.findById(req.user.Id);
    if (!!!superhuman) {
        return next(new MyError("Only superhuman can access this route", 403));
    }
    if (!!!superhuman.isAdmin) {
        return next(new MyError("Only superhuman can access this route", 403));
    }
    return next();
});

const getAccessTokenFromHeader = req => {
    const { authorization } = req.headers;
    return authorization.split(" ")[1];
};

const isTokenIncluded = req =>
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:");

module.exports = {
    getAccessToRoute,
    getSuperhumanAccess
};
