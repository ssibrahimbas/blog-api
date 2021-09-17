const {Router} = require("express")

const {
    createSchool,
    getAllSchools,
    getSchoolById,
    updateSchool,
    deleteSchool
} = require(`${process.cwd()}/controllers/global/schoolController`);

const School = require(`${process.cwd()}/models/global/School`);

const {
    uploadFile
} = require(`${process.cwd()}/middlewares/multer/uploadMiddleware`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const router = Router()

router.post("/create", uploadFile("global/school", "school"), createSchool);
router.get("/all", getAllSchools);
router.get("/:Id", checkDocumentByIdAndModel(School), getSchoolById);
router.put(
    "/:Id/edit",
    [checkDocumentByIdAndModel(School), uploadFile("global/school", "school")],
    updateSchool
);
router.delete("/:Id", checkDocumentByIdAndModel(School), deleteSchool);

module.exports = router