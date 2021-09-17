const Answer = require(`${process.cwd()}/models/post/Answer`);
const Post = require(`${process.cwd()}/models/post/Post`);
const User = require(`${process.cwd()}/models/user/user/User`);
const Evaluation = require(`${process.cwd()}/models/post/Evaluation`);

const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);
const MyError = require(`${process.cwd()}/helpers/error/MyError`);

const checkPostExist = errorWrapper(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!!!post) {
        return next(new MyError(`Post not found with this id: ${postId}`, 404));
    }
    next();
});

const checkPostAndEvaluationExist = errorWrapper(async (req, res, next) => {
    const { postId, evaluationId } = req.params;

    const evaluation = await Evaluation.findOne({
        _id: evaluationId,
        post: postId
    });

    if (!!!evaluation)
        return next(
            new MyError(
                `Evaluation not found with evaluation Id: ${evaluationId}`,
                404
            )
        );
    next();
});

const checkEvaluationAndAnswerExist = errorWrapper(async (req, res, next) => {
    const { evaluationId, answerId } = req.params;

    const answer = await Answer.findOne({
        _id: answerId,
        evaluation: evaluationId
    });

    if (!!!answer)
        return next(
            new MyError(`Answer not found with answer Id: ${answerId}`, 404)
        );
    next();
});

const checkUserExist = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;
    const user = await User.findById(Id);

    if (!!!user) return next(new MyError(`User not found with Id: ${Id}`, 404));
    next();
});

const checkDocumentByIdAndModel = model => {
    return errorWrapper(async (req, res, next) => {
        const { Id } = req.params;

        const document = await model.findById(Id);

        if (!!!document)
            return next(
                new MyError(`Document not found with Id: ${Id}, Model: ${model}`, 404)
            );
        next();
    });
};

module.exports = {
    checkPostExist,
    checkPostAndEvaluationExist,
    checkEvaluationAndAnswerExist,
    checkUserExist,
    checkDocumentByIdAndModel
};
