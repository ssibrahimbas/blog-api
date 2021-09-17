const Post = require(`${process.cwd()}/models/post/Post`);
const {
    errorWrapper
} = require(`${process.cwd()}/helpers/error/errorWrapper`);

const getAllPosts = errorWrapper(async (req, res, next) => {
    return res.status(200).json(res.advanceQueryResults);
});

const getSinglePost = errorWrapper(async (req, res, next) => {
    return res.status(200).json(res.advanceQueryResults);
});

const addNewPost = errorWrapper(async (req, res, next) => {
    const { imageUrl, markdownUrl, document } = req;
    const content = req.body;

    const post = await Post.create({
        ...content,
        imageUrl,
        markdownUrl,
        document,
        author: req.user.Id
    });

    res.status(201).send({
        success: true,
        message: "post successfully created",
        post
    });
});

const editPost = errorWrapper(async (req, res, next) => {
    const { postId } = req.params;
    const content = req.body;
    const { imageUrl, markdownUrl, document } = req;

    const post = await Post.findByIdAndUpdate(
        postId,
        {
            ...content,
            imageUrl,
            markdownUrl,
            document
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(201).send({
        success: true,
        message: "post successfully updated",
        post: post
    });
});

const deletePost = errorWrapper(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    await post.remove();

    res.status(200).send({
        success: true,
        message: "post successfully deleted",
        post
    });
});

module.exports = {
    getAllPosts,
    getSinglePost,
    addNewPost,
    editPost,
    deletePost
};
