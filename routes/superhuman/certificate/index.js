const {Router} = require("express")
const router = Router({mergeParams: true})

const {
    createCertificate,
    getAllCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate
} = require(`${process.cwd()}/controllers/user/certificateController`);

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

const Certificate = require(`${process.cwd()}/models/user/superhuman/Certificate`);

router.get("/all", getAllCertificates);
router.get(
    "/:Id",
    [checkDocumentByIdAndModel(Certificate)],
    getCertificateById
);
router.post(
    "/create",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        uploadFile("user/certificate", "certificate")
    ],
    createCertificate
);
router.put(
    "/:Id/edit",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(Certificate),
        uploadFile("user/certificate", "certificate")
    ],
    updateCertificate
);
router.delete(
    "/:Id",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(Certificate)
    ],
    deleteCertificate
);


module.exports = router;
