const multer = require("multer")
const path = require("path")

const {
    photoFilter,
    markdownFilter,
    pdfFilter,
    postFilter
} = require(`${process.cwd()}/helpers/library/multer`)

const kinds = {
    post: {
        markdownUrl: () =>
            path.join(`${process.cwd()}/static/uploads/post/markdown`),
        imageUrl: () => path.join(`${process.cwd()}/static/uploads/post/image`),
        document: () => path.join(`${process.cwd()}/static/uploads/post/docs`)
    },
    project: {
        markdownUrl: () =>
            path.join(`${process.cwd()}/static/uploads/user/project/markdown`),
        document: () =>
            path.join(`${process.cwd()}/static/uploads/user/project/docs`)
    }
};

const filters = {
    photo: photoFilter,
    pdf: pdfFilter,
    md: markdownFilter
};

const fields = {
    post: [
        {
            name: "imageUrl",
            maxCount: 1
        },
        {
            name: "markdownUrl",
            maxCount: 1
        },
        {
            name: "document",
            maxCount: 1
        }
    ],
    project: [
        {
            name: "markdownUrl",
            maxCount: 1
        },
        {
            name: "document",
            maxCount: 1
        }
    ]
};

const uploadFile = (
    folder,
    name,
    paramName = "imageUrl",
    fileType = "photo",
    piece = "single"
) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.join(`${process.cwd()}/static/uploads/${folder}`));
        },
        filename: (req, file, callback) => {
            const extension = file.mimetype.split("/")[1];
            const Id = Date.now();
            let fileName = `${name}_${Id}.${extension}`;
            if (!!!req[paramName]) {
                req[paramName] = fileName;
            } else {
                req[paramName] += ";" + fileName;
            }
            callback(null, fileName);
        }
    });

    return multer({
        storage,
        fileFilter: filters[fileType] || photoFilter
    })[piece](paramName);
};

const uploadFiles = kind => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const folder = kinds[kind][file.fieldname]();
            callback(null, folder);
        },
        filename: (req, file, callback) => {
            const extension = file.mimetype.split("/")[1];
            const Id = Date.now();
            let fileName = `${kind}_${Id}.${extension}`;
            if (!!!req[file.fieldname]) {
                req[file.fieldname] = fileName;
            } else {
                req[file.fieldname] += ";" + fileName;
            }
            callback(null, fileName);
        }
    });

    return multer({
        storage,
        fileFilter: postFilter
    }).fields(fields[kind]);
};

module.exports = {
    uploadFile,
    uploadFiles
};
