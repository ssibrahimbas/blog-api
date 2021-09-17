const Education = require(`${process.cwd()}/models/user/superhuman/Education`);
const Superhuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createEducation = errorWrapper(async (req, res, next) => {
    const infos = req.body;

    const education = await Education.create({
        ...infos,
        superhuman: req.user.Id
    });

    return res.status(201).json({
        success: true,
        message: `Education created successfully`,
        education
    });
});

const getAllEducations = errorWrapper(async (req, res, next) => {
    const { superId } = req.params;

    const superhuman = await Superhuman.findById(superId).populate("educations");
    const { educations } = superhuman;

    return res.status(200).json({
        success: true,
        message: "Educations fetched successfully",
        educations
    });
});

const getEducationById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const education = await Education.findById(Id).populate({
        path: "superhuman",
        select: "firstName lastName about profileImage"
    });

    return res.status(200).json({
        success: true,
        message: "Education fetched successfully",
        education
    });
});

const updateEducation = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;

    const education = await Education.findByIdAndUpdate(Id, infos, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        message: "Education updated successfully",
        education
    });
});

const deleteEducation = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const education = await Education.findById(Id);
    await education.remove();

    return res.status(200).json({
        success: true,
        message: `Education deleted successfully`,
        education
    });
});

module.exports = {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation
};
