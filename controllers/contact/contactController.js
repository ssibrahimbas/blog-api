const Contact = require(`${process.cwd()}/models/contact/Contact`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createContact = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { images } = req;

    let imagesArray = [];
    if (!!images) {
        imagesArray = images.split(";");
    }

    const contact = await Contact.create({
        ...infos,
        images: imagesArray
    });

    return res.status(201).json({
        success: true,
        message: "Contact created successfully",
        contact
    });
});

const getAllContacts = errorWrapper(async (req, res, next) => {
    const contacts = await Contact.find();

    return res.status(200).json({
        success: true,
        message: "Contact created successfully",
        contacts
    });
});

const getContactById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const contact = await Contact.findById(Id);

    return res.status(200).json({
        success: true,
        message: "Contact created successfully",
        contact
    });
});

const deleteContact = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const contact = await Contact.findById(Id);
    await contact.remove();

    res.status(200).json({
        success: true,
        message: "Delete Contact successfully",
        contact
    });
});

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    deleteContact
};
