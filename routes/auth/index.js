const {Router} = require("express")

const {login, logout} = require(`${process.cwd()}/controllers/auth/authController`)

const {
    getAccessToRoute,
    getSuperhumanAccess
} = require(`${process.cwd()}/middlewares/auth/auth`)

const router = Router()

router.post("/login", login);
router.get("/logout", [getAccessToRoute, getSuperhumanAccess], logout);

module.exports = router