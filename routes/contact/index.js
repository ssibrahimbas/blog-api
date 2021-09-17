const {Router} = require("express")

const {
    getAllContacts,
    getContactById,
    deleteContact,
    createContact
} = require(`${process.cwd()}/controllers/contact/contactController`);

const Contact = require(`${process.cwd()}/models/contact/Contact`);

const {
    uploadFile
} = require(`${process.cwd()}/middlewares/multer/uploadMiddleware`);
const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const router = Router()

router.get("/all", [getAccessToRoute, getSuperhumanAccess], getAllContacts);
router.get(
    "/:Id",
    [getAccessToRoute, getSuperhumanAccess, checkDocumentByIdAndModel(Contact)],
    getContactById
);
router.delete(
    "/:Id",
    [getAccessToRoute, getSuperhumanAccess, checkDocumentByIdAndModel(Contact)],
    deleteContact
);
router.post(
    "/create",
    uploadFile("contact", "contact", "images", "photo", "array"),
    createContact
);

module.exports = router