const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const {
    getPaginatorVariables,
    populateHelper
} = require(`${process.cwd()}/helpers/query/queryHelpers`);

const evaluationQueryMiddleware = (model, options) => {
    return errorWrapper(async (req, res, next) => {
        const { Id } = req.params;
        const { array, lengthBy } = options;

        const total = (await model.findById(Id).select(lengthBy))[lengthBy];

        const { pagination, indexOfStart, limit } = await getPaginatorVariables(
            req,
            total
        );

        let queryObject = {};

        queryObject[array] = { $slice: [indexOfStart, limit] };

        let query = model.find({ _id: Id }, queryObject);

        query = populateHelper(query, options.populate);

        let result = await query;

        res.advanceQueryResults = {
            success: true,
            pagination: Object.keys(pagination).length === 0 ? undefined : pagination,
            result
        };
        next();
    });
};

module.exports = evaluationQueryMiddleware;
