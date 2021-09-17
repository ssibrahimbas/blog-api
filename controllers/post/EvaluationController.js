const Evaluation = require(`${process.cwd()}/models/post/Evaluation`);
const Post = require(`${process.cwd()}/models/post/Post`);

const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createEvaluation = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { postId } = req.params;

    const evaluation = await Evaluation.create({
        ...infos,
        post: postId
    });

    return res.status(201).json({
        success: true,
        message: "Evaluation created successfully",
        evaluation
    });
});

const getAllEvaluations = errorWrapper(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("evaluations");

    const { evaluations } = post;

    return res.status(200).json({
        success: true,
        message: "evaluations fetched successfully",
        count: post.countOfEvaluation,
        evaluations
    });
});

const getEvaluationById = errorWrapper(async (req, res, next) => {
    const { evaluationId } = req.params;

    const evaluation = await Evaluation.findById(evaluationId)
        .populate({
            path: "post",
            select: "title shortDescription"
        })
        .populate({
            path: "answer",
            populate: {
                path: "author",
                select: "profileImage firstName lastName about"
            }
        });

    return res.status(200).json({
        success: true,
        message: "Evaluation fetched successfully",
        evaluation
    });
});

const deleteEvaluation = errorWrapper(async (req, res, next) => {
    const { evaluationId } = req.params;

    const evaluation = await Evaluation.findById(evaluationId);
    await evaluation.remove();

    return res.status(200).json({
        success: true,
        message: "Evaluations deleted successfully",
        evaluation
    });
});

module.exports = {
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
    deleteEvaluation
};
