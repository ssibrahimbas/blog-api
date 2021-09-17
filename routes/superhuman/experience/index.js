const {Router} = require("express")
const router = Router({mergeParams: true})

const {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
} = require(`${process.cwd()}/controllers/user/experienceController`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const Experience = require(`${process.cwd()}/models/user/superhuman/Experience`);

router.get("/all", getAllExperiences);
router.get("/:Id", [checkDocumentByIdAndModel(Experience)], getExperienceById);
router.post(
    "/create",
    [getAccessToRoute, getSuperhumanAccess],
    createExperience
);
router.put(
    "/:Id/edit",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(Experience)
    ],
    updateExperience
);
router.delete(
    "/:Id",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(Experience)
    ],
    deleteExperience
);

module.exports = router;
