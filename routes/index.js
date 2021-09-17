const {Router} = require("express")

const global = require(`${process.cwd()}/routes/global`)
const auth = require(`${process.cwd()}/routes/auth`)
const superhuman = require(`${process.cwd()}/routes/superhuman`)
const post = require(`${process.cwd()}/routes/post`)
const contact = require(`${process.cwd()}/routes/contact`)

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`);

const router = Router()

router.use("/auth", auth);
router.use("/superhuman", superhuman);
router.use("/global", [getAccessToRoute, getSuperhumanAccess], global);
router.use("/blog", post);
router.use("/contact", contact);

module.exports = router