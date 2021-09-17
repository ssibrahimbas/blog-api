const MyError = require(`${process.cwd()}/helpers/error/MyError`);

const errorHandler = (err, req, res, next) => {
    let customError = new MyError(err.message, err.status);

    if (err.name === "SyntaxError") {

        customError = new MyError("Unexpected Syntax",400);
    }
    if (err.name === "ValidationError") {

        customError = new MyError(err.message,400);
    }
    if (err.name === "CastError") {
        customError = new MyError("Please provide a valid input",400);
    }
    if (err.name === "MongoNetworkError") {
        customError = new MyError("There is a problem with network,Please try again later",500);

    }

    return res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Internal Server Error"
    });
};

module.exports = errorHandler;
