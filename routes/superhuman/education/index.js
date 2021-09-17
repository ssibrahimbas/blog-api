const {Router} = require("express")
const router = Router({mergeParams: true})

const {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation
} = require(`${process.cwd()}/controllers/user/educationController`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const Education = require(`${process.cwd()}/models/user/superhuman/Education`);

router.get("/all", getAllEducations);
router.get("/:Id", [checkDocumentByIdAndModel(Education)], getEducationById);
router.post(
    "/create",
    [getAccessToRoute, getSuperhumanAccess],
    createEducation
);
router.put(
    "/:Id/edit",
    [getAccessToRoute, getSuperhumanAccess, checkDocumentByIdAndModel(Education)],
    updateEducation
);
router.delete(
    "/:Id",
    [getAccessToRoute, getSuperhumanAccess, checkDocumentByIdAndModel(Education)],
    deleteEducation
);

module.exports = router;
