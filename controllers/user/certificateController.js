const Certificate = require(`${process.cwd()}/models/user/superhuman/Certificate`);
const Superhuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createCertificate = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { document } = req;

    let data = {
        ...infos
    };
    if (!!document) {
        data["document"] = document;
    }

    const certificate = await Certificate.create({
        ...data
    });

    return res.status(201).json({
        success: true,
        message: `Certificate created successfully`,
        certificate
    });
});

const getAllCertificates = errorWrapper(async (req, res, next) => {
    const { superId } = req.params;

    const superhuman = await Superhuman.findById(superId).populate(
        "certificates"
    );
    const { certificates } = superhuman;

    return res.status(200).json({
        success: true,
        message: `Certificates fetched successfully`,
        count: certificates.length,
        certificates
    });
});

const getCertificateById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const certificate = await Certificate.findById(Id).populate({
        path: "superhuman",
        select: "firstName lastName about profileImage"
    });

    return res.status(200).json({
        success: true,
        message: `Certificate fetched successfully`,
        certificate
    });
});

const updateCertificate = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { Id } = req.params;
    const { document } = req;

    let data = {
        ...infos
    };
    if (!!document) {
        data["document"] = document;
    }

    const certificate = await Certificate.findByIdAndUpdate(Id, data, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        message: "Certificate updated successfully",
        certificate
    });
});

const deleteCertificate = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const certificate = await Certificate.findById(Id);
    await certificate.remove();

    return res.status(200).json({
        success: true,
        message: `Certificate deleted successfully`,
        certificate
    });
});

module.exports = {
    createCertificate,
    getAllCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate
};
