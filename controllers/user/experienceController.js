const Experience = require(`${process.cwd()}/models/user/superhuman/Experience`);
const Superhuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createExperience = errorWrapper(async (req, res, next) => {
    const infos = req.body;

    const experience = await Experience.create({
        ...infos,
        superhuman: req.user.Id
    });

    return res.status(201).json({
        success: true,
        message: `Experience created successfully`,
        experience
    });
});

const getAllExperiences = errorWrapper(async (req, res, next) => {
    const { superId } = req.params;

    const superhuman = await Superhuman.findById(superId).populate("experiences");
    const { experiences } = superhuman;

    return res.status(200).json({
        success: true,
        message: `Experiences fetched successfully`,
        experiences
    });
});

const getExperienceById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const experience = await Experience.findById(Id).populate({
        path: "superhuman",
        select: "firstName lastName about profileImage"
    });

    return res.status(200).json({
        success: true,
        message: `Experience fetched successfully`,
        experience
    });
});

const updateExperience = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;

    const experience = await Experience.findByIdAndUpdate(Id, infos, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        message: "Experience updated successfully",
        experience
    });
});

const deleteExperience = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const experience = await Experience.findById(Id);
    await experience.remove();

    return res.status(200).json({
        success: true,
        message: `Experience deleted successfully`,
        experience
    });
});

module.exports = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
};
