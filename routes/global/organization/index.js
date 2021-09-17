const {Router} = require("express")

const {
    getAllOrganizations,
    getOrganizationById,
    deleteOrganization,
    createOrganization,
    updateOrganization
} = require(`${process.cwd()}/controllers/global/organizationController`);

const Organization = require(`${process.cwd()}/models/global/Organization`);

const {
    uploadFile
} = require(`${process.cwd()}/middlewares/multer/uploadMiddleware`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const router = Router()

router.get("/all", getAllOrganizations);
router.get(
    "/:Id",
    checkDocumentByIdAndModel(Organization),
    getOrganizationById
);
router.post(
    "/create",
    uploadFile("global/organization", "organization"),
    createOrganization
);
router.put(
    "/:Id",
    [
        checkDocumentByIdAndModel(Organization),
        uploadFile("global/organization", "organization")
    ],
    updateOrganization
);
router.delete(
    "/:Id",
    checkDocumentByIdAndModel(Organization),
    deleteOrganization
);


module.exports = router