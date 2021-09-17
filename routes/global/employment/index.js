const {Router} = require("express")

const {
    createEmployment,
    getAllEmployment,
    getEmploymentById,
    deleteEmployment,
    updateEmployment
} = require(`${process.cwd()}/controllers/global/employmentController`);

const Evaluation = require(`${process.cwd()}/models/global/Employment`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const router = Router()

router.post("/create", createEmployment);
router.get("/all", getAllEmployment);
router.get("/:Id", checkDocumentByIdAndModel(Evaluation), getEmploymentById);
router.put("/:Id", checkDocumentByIdAndModel(Evaluation), updateEmployment);
router.delete("/:Id", checkDocumentByIdAndModel(Evaluation), deleteEmployment);

module.exports = router