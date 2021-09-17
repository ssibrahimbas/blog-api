const {Router} = require("express")

const {
    createAnswer,
    getAnswer,
    deleteAnswer
} = require(`${process.cwd()}/controllers/post/answerController`);

const {
    checkEvaluationAndAnswerExist,
    checkPostAndEvaluationExist
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const router = Router({ mergeParams: true })

router.post("/create", checkPostAndEvaluationExist, createAnswer);
router.get("/:answerId", checkEvaluationAndAnswerExist, getAnswer);
router.delete("/:answerId", checkEvaluationAndAnswerExist, deleteAnswer);

module.exports = router