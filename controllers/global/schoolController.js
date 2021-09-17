const School = require(`${process.cwd()}/models/global/School`)
const {errorWrapper} = require(`${process.cwd()}/helpers/error/errorWrapper`)

const createSchool = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { imageUrl } = req;

    const school = await School.create({
        ...infos,
        imageUrl
    });

    return res.status(201).json({
        success: true,
        message: "School created successfully",
        school
    });
});

const getAllSchools = errorWrapper(async (req, res, next) => {
    const schools = await School.find();

    return res.status(200).json({
        success: true,
        message: "Schools fetched successfully",
        schools
    });
});

const getSchoolById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const school = await School.findById(Id);

    return res.status(200).json({
        success: true,
        message: "School fetched successfully",
        school
    });
});

const updateSchool = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;
    const { imageUrl } = req;

    const school = await School.findByIdAndUpdate(
        Id,
        { ...infos, imageUrl },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        message: "School updated successfully",
        school
    });
});

const deleteSchool = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const school = await School.findById(Id);
    await school.remove();

    return res.status(200).json({
        success: true,
        message: "School deleted successfully",
        school
    });
});

module.exports = {
    createSchool,
    getAllSchools,
    getSchoolById,
    updateSchool,
    deleteSchool
};
