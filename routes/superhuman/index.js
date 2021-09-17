const {Router} = require("express")

const certificate = require(`${process.cwd()}/routes/superhuman/certificate`)
const education = require(`${process.cwd()}/routes/superhuman/education`)
const experience = require(`${process.cwd()}/routes/superhuman/experience`)
const project = require(`${process.cwd()}/routes/superhuman/project`)
const socialMedia = require(`${process.cwd()}/routes/superhuman/socialMedia`)

const {
    updateSuperhuman,
    getSuperHuman
} = require(`${process.cwd()}/controllers/user/superhumanController`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const {
    uploadFile
} = require(`${process.cwd()}/middlewares/multer/uploadMiddleware`);
const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);

const router = Router()

router.get("/:Id", checkDocumentByIdAndModel(SuperHuman), getSuperHuman);
router.put(
    "/:Id/edit",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(SuperHuman),
        uploadFile("user/media", "ssi")
    ],
    updateSuperhuman
);

router.use("/:superId/certificate", certificate);
router.use("/:superId/education", education);
router.use("/:superId/experience", experience);
router.use("/:superId/project", project);
router.use("/:superId/socialMedia", socialMedia);

module.exports = router