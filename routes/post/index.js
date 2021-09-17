const {Router} = require("express")

const evaluation = require(`${process.cwd()}/routes/post/evaluation`)

const {
    addNewPost,
    getAllPosts,
    getSinglePost,
    editPost,
    deletePost
} = require(`${process.cwd()}/controllers/post/postController`);

const {
    uploadFiles
} = require(`${process.cwd()}/middlewares/multer/uploadMiddleware`);

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const Post = require(`${process.cwd()}/models/post/Post`);

const postQueryMiddleware = require(`${process.cwd()}/middlewares/query/postQueryMiddleware`);
const evaluationQueryMiddleware = require(`${process.cwd()}/middlewares/query/evaluationQueryMiddleware`);

const {
    checkPostExist
} = require(`${process.cwd()}/middlewares/database/databaseErrorHelpers`);

const router = Router()

router.get("/all", postQueryMiddleware(Post), getAllPosts);
router.get(
    "/:Id",
    [
        checkPostExist,
        evaluationQueryMiddleware(Post, {
            array: "evaluations",
            lengthBy: "countOfEvaluation",
            populate: [
                {
                    path: "evaluations",
                    select: "title content senderName answer",
                    populate: {
                        path: "answer",
                        populate: {
                            path: "author",
                            select: "profileImage firstName lastName about"
                        },
                        select: "senderName title content"
                    }
                }
            ]
        })
    ],
    getSinglePost
);
router.post(
    "/create",
    [getAccessToRoute, getSuperhumanAccess, uploadFiles("post")],
    addNewPost
);
router.put(
    "/:postId/edit",
    [getAccessToRoute, getSuperhumanAccess, checkPostExist, uploadFiles("post")],
    editPost
);
router.delete(
    "/:postId",
    [getAccessToRoute, getSuperhumanAccess, checkPostExist],
    deletePost
);

router.use("/:postId/evaluation", evaluation);

module.exports = router