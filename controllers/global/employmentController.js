const Employment = require(`${process.cwd()}/models/global/Employment`)
const {errorWrapper} = require(`${process.cwd()}/helpers/error/errorWrapper`)

const createEmployment = errorWrapper(async (req, res, next) => {
    const infos = req.body;

    const employment = await Employment.create({
        ...infos
    });

    res.status(201).json({
        success: true,
        message: "Employment created successfully",
        employment
    });
});

const getAllEmployment = errorWrapper(async (req, res, next) => {
    const employments = await Employment.find();

    return res.status(200).json({
        success: true,
        message: "Employments fetched successfully",
        employments
    });
});

const getEmploymentById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const employment = await Employment.findById(Id);

    return res.status(200).json({
        success: true,
        message: "Employment fetched successfully",
        employment
    });
});

const updateEmployment = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;

    const employment = await Employment.findByIdAndUpdate(Id, infos, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Employment updated successfully",
        employment
    });
});

const deleteEmployment = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const employment = await Employment.findById(Id);
    await employment.remove();

    res.status(200).json({
        success: true,
        message: "Employment deleted successfully",
        employment
    });
});

module.exports = {
    createEmployment,
    getAllEmployment,
    getEmploymentById,
    updateEmployment,
    deleteEmployment
};
