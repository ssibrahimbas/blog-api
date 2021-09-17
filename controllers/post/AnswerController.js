const Answer = require(`${process.cwd()}/models/post/Answer`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createAnswer = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { evaluationId } = req.params;
    const { user } = req;

    const answer = await Answer.create({
        ...infos,
        evaluation: evaluationId,
        author: user.Id
    });

    return res.status(201).json({
        success: true,
        message: "Answer created successfully",
        answer
    });
});

const getAnswer = errorWrapper(async (req, res, next) => {
    const { evaluationId } = req.params;

    const answer = await Answer.find({ evaluation: evaluationId })
        .populate({
            path: "author",
            select: "profileImage firstName lastName about"
        })
        .populate("evaluation");

    return res.status(200).json({
        success: true,
        message: "answer fetched successfully",
        answer
    });
});

const deleteAnswer = errorWrapper(async (req, res, next) => {
    const { answerId } = req.params;

    const answer = await Answer.findById(answerId);
    await answer.remove();

    return res.status(200).json({
        success: true,
        message: "Answer deleted successfully",
        answer
    });
});

module.exports = {
    createAnswer,
    getAnswer,
    deleteAnswer
};
