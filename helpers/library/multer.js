const MyError = require(`${process.cwd()}/helpers/error/MyError`)

const photoFilter = (req, file, callback) => {
    const allowedTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        return callback(
            new MyError("Please provide a valid image file", 400),
            false
        );
    }
    return callback(null, true);
}

const markdownFilter = (req, file, callback) => {
    const allowedTypes = ["text/markdown"];
    if (!allowedTypes.includes(file.mimetype)) {
        return callback(new MyError("Please provide a valid file", 400), false);
    }
    return callback(null, true);
};

const pdfFilter = (req, file, callback) => {
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
        return callback(new MyError("Please provide a valid file", 400), false);
    }
    return callback(null, true);
};

const postFilter = (req, file, callback) => {
    const allowedTypes = [
        "application/pdf",
        "text/markdown",
        "image/jpg",
        "image/gif",
        "image/jpeg",
        "image/png"
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        return callback(
            new MyError("Please provide a valid image file", 400),
            false
        );
    }
    return callback(null, true);
};

module.exports = {
    photoFilter,
    pdfFilter,
    markdownFilter,
    postFilter
};
