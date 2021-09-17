const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const {
    paginationHelper,
    searchHelper,
    populateHelper,
    postSortHelper
} = require(`${process.cwd()}/helpers/query/queryHelpers`);

const postQueryMiddleware = (model, options) => {
    return errorWrapper(async (req, res, next) => {
        let query = model.find({});

        query = searchHelper("title", query, req);

        if (!!options && !!options.population) {
            query = populateHelper(query, options.population);
        }

        query = postSortHelper(query, req);

        let pagination;

        const paginationResult = await paginationHelper(model, query, req);

        query = paginationResult.query;

        pagination = paginationResult.pagination;

        const advanceQueryResults = await query;

        res.advanceQueryResults = {
            success: true,
            count: advanceQueryResults.length,
            pagination,
            result: advanceQueryResults
        };
        next();
    });
};

module.exports = postQueryMiddleware;
