const errorWrapper = asyncFunc => {
    return (req, res, next) => {
        asyncFunc(req, res, next).catch(next)
    }
}

module.exports = {
    errorWrapper
}