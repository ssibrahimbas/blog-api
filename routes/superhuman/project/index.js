const {Router} = require("express")
const router = Router({mergeParams: true})

const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require(`${process.cwd()}/controllers/user/projectController`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const {
    uploadFiles
} = require(`${process.cwd()}/middlewares/multer/uploadMiddleware`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const Project = require(`${process.cwd()}/models/user/superhuman/Project`);

router.get("/all", getAllProjects);
router.get("/:Id", [checkDocumentByIdAndModel(Project)], getProjectById);
router.post(
    "/create",
    [getAccessToRoute, getSuperhumanAccess, uploadFiles("project")],
    createProject
);
router.put(
    "/:Id/edit",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(Project),
        uploadFiles("project")
    ],
    updateProject
);
router.delete(
    "/:Id",
    [getAccessToRoute, getSuperhumanAccess, checkDocumentByIdAndModel(Project)],
    deleteProject
);


module.exports = router;
