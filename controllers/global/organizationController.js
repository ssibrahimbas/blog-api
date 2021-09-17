const Organization = require(`${process.cwd()}/models/global/Organization`)
const {errorWrapper} = require(`${process.cwd()}/helpers/error/errorWrapper`)

const createOrganization = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { imageUrl } = req;

    const organization = await Organization.create({
        ...infos,
        imageUrl
    });

    return res.status(201).json({
        success: true,
        message: "Organization created successfully",
        organization
    });
});

const getAllOrganizations = errorWrapper(async (req, res, next) => {
    const organizations = await Organization.find();

    return res.status(200).json({
        success: true,
        message: "Organizations fetched successfully",
        organizations
    });
});

const getOrganizationById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const organization = await Organization.findById(Id);

    return res.status(200).json({
        success: true,
        message: "Organization fetched successfully",
        organization
    });
});

const updateOrganization = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;
    const { imageUrl } = req;

    let data = {
        ...infos
    };
    if (!!imageUrl) {
        data["imageUrl"] = imageUrl;
    }

    const organization = await Organization.findByIdAndUpdate(Id, data, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        message: "Organization updated successfully",
        organization
    });
});

const deleteOrganization = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const organization = await Organization.findById(Id);
    await organization.remove();

    return res.status(200).json({
        success: true,
        message: "Organization deleted successfully",
        organization
    });
});

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization
};