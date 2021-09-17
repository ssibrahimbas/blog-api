const {Router} = require("express")

const answer = require(`${process.cwd()}/routes/post/evaluation/answer`)

const {
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
    deleteEvaluation
} = require(`${process.cwd()}/controllers/post/evaluationController`)

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`)

const {
    checkPostExist,
    checkPostAndEvaluationExist
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`)

const router = Router({mergeParams:true})

router.get('/', checkPostExist, getAllEvaluations);
router.get("/:evaluationId",checkPostAndEvaluationExist, getEvaluationById)
router.post("/create", checkPostExist, createEvaluation)
router.delete("/:evaluationId/delete", [checkPostAndEvaluationExist, getAccessToRoute, getSuperhumanAccess], deleteEvaluation)

router.use("/:evaluationId/answer", [getAccessToRoute, getSuperhumanAccess], answer)

module.exports = router