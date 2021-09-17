const getPaginatorVariables = async (req, total) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const indexOfStart = (page - 1) * limit;
    const indexOfEnd = page * limit;

    const pagination = {};

    if (indexOfStart > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    if (indexOfEnd < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    return {
        pagination,
        indexOfStart,
        limit
    };
};

const paginationHelper = async (model, query, req) => {
    const total = await model.countDocuments();

    const { pagination, indexOfStart, limit } = await getPaginatorVariables(
        req,
        total
    );

    return {
        query: query.skip(indexOfStart).limit(limit),
        pagination: Object.keys(pagination).length === 0 ? undefined : pagination
    };
};

const searchHelper = (searchKey, query, req) => {
    if (req.query.search) {
        let queryObject = {};
        queryObject[searchKey] = new RegExp(req.query.search, "i");
        return query.where(queryObject);
    }
    return query;
};

const populateHelper = (query, populate) => {
    return query.populate(populate);
};

const postSortHelper = (query, req) => {
    const { sortBy } = req.query;

    if (!!sorts[sortBy]) {
        return query.sort(sorts[sortBy]);
    }

    return query.sort(`-dateOfCreate`);
};

const sorts = {
    "most-commented": () => {
        return `-countOfEvaluation -title`;
    }
};

module.exports = {
    getPaginatorVariables,
    paginationHelper,
    searchHelper,
    populateHelper,
    postSortHelper
};
