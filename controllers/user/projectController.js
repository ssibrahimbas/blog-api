const Project = require(`${process.cwd()}/models/user/superhuman/Project`);
const Superhuman = require(`${process.cwd()}/models/user/superhuman/Superhuman`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const createProject = errorWrapper(async (req, res, next) => {
    const { markdownUrl, document } = req;

    let data = {
        ...req.body
    };
    data = setDocuments(data, markdownUrl, document);

    const project = await Project.create({
        ...data,
        superhuman: req.user.Id
    });

    return res.status(201).json({
        success: true,
        message: `Project created successfully`,
        project
    });
});

const getAllProjects = errorWrapper(async (req, res, next) => {
    const { superId } = req.params;

    const superhuman = await Superhuman.findById(superId).populate("projects");
    const { projects } = superhuman;

    return res.status(200).json({
        success: true,
        message: `Projects fetched successfully`,
        projects
    });
});

const getProjectById = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const project = await Project.findById(Id).populate({
        path: "superhuman",
        select: "firstName lastName about profileImage"
    });

    return res.status(200).json({
        success: true,
        message: `Project fetched successfully`,
        project
    });
});

const updateProject = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;
    const { document, markdownUrl } = req;

    let data = {
        ...req.body
    };
    data = setDocuments(data, markdownUrl, document);

    const project = await Project.findByIdAndUpdate(Id, data, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        project
    });
});

const deleteProject = errorWrapper(async (req, res, next) => {
    const { Id } = req.params;

    const project = await Project.findById(Id);
    await project.remove();

    return res.status(200).json({
        success: true,
        message: `Project deleted successfully`,
        project
    });
});

const setDocuments = (data, markdown, document) => {
    if (!!markdown) {
        data["markdownUrl"] = markdown;
    }
    if (!!document) {
        data["document"] = document;
    }
    return data;
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
