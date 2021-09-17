const SuperHuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const updateSuperhuman = errorWrapper(async (req, res, next) => {
    const infos = req.body;
    const { imageUrl } = req;

    let data = {
        ...infos
    };
    if (!!imageUrl) {
        data["profileImage"] = imageUrl;
    }

    const superhuman = await SuperHuman.findByIdAndUpdate(req.user.Id, data, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        superhuman
    });
});

const getSuperHuman = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const superhuman = await SuperHuman.findById(Id);

    return res.status(200).json({
        success: true,
        message: "Superhuman fetched successfully",
        superhuman: {
            firstName: superhuman.firstName,
            lastName: superhuman.lastName,
            description: superhuman.description,
            about: superhuman.about,
            abilities: superhuman.abilities,
            dateOfBirth: superhuman.dateOfBirth,
            profileImage: superhuman.profileImage
        }
    });
});

module.exports = {
    updateSuperhuman,
    getSuperHuman
};
