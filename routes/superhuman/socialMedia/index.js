const {Router} = require("express")
const router = Router({mergeParams: true})

const {
    createSocialMedia,
    getAllSocialMedias,
    getSocialMediaById,
    updateSocialMedia,
    deleteSocialMedia
} = require(`${process.cwd()}/controllers/user/socialMediaController`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const {
    checkDocumentByIdAndModel
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const SocialMedia = require(`${process.cwd()}/models/user/superhuman/SocialMedia`);

router.get("/all", getAllSocialMedias);
router.get(
    "/:Id",
    [checkDocumentByIdAndModel(SocialMedia)],
    getSocialMediaById
);
router.post(
    "/create",
    [getAccessToRoute, getSuperhumanAccess],
    createSocialMedia
);
router.put(
    "/:Id/edit",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(SocialMedia)
    ],
    updateSocialMedia
);
router.delete(
    "/:Id",
    [
        getAccessToRoute,
        getSuperhumanAccess,
        checkDocumentByIdAndModel(SocialMedia)
    ],
    deleteSocialMedia
);

module.exports = router;
