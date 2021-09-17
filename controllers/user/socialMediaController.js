const SocialMedia = require(`${process.cwd()}/models/user/superhuman/SocialMedia`);
const Superhuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createSocialMedia = errorWrapper(async (req, res, next) => {
    const infos = req.body;

    const socialMedia = await SocialMedia.create({
        ...infos,
        superhuman: req.user.Id
    });

    return res.status(201).json({
        success: true,
        message: `social media created successfully`,
        socialMedia
    });
});

const getAllSocialMedias = errorWrapper(async (req, res, next) => {
    const { superId } = req.params;

    const superhuman = await Superhuman.findById(superId).populate(
        "socialMedias"
    );
    const { socialMedias } = superhuman;

    return res.status(200).json({
        success: true,
        message: `social medias fetched successfully`,
        socialMedias
    });
});

const getSocialMediaById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const socialMedia = await SocialMedia.findById(Id).populate({
        path: "superhuman",
        select: "firstName lastName about profileImage"
    });

    return res.status(200).json({
        success: true,
        message: `social media fetched successfully`,
        socialMedia
    });
});

const updateSocialMedia = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;

    const socialMedia = await SocialMedia.findByIdAndUpdate(Id, infos, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        message: "Social media updated successfully",
        socialMedia
    });
});

const deleteSocialMedia = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const socialMedia = await SocialMedia.findById(Id);
    await socialMedia.remove();

    return res.status(200).json({
        success: true,
        message: `Social media deleted successfully`,
        socialMedia
    });
});

module.exports = {
    createSocialMedia,
    getAllSocialMedias,
    getSocialMediaById,
    updateSocialMedia,
    deleteSocialMedia
};
