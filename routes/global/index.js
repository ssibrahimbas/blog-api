const {Router} = require("express")

const employment = require(`${process.cwd()}/routes/global/employment`)
const organization = require(`${process.cwd()}/routes/global/organization`)
const school = require(`${process.cwd()}/routes/global/school`)

const router = Router()

router.use("/employment", employment)
router.use("/organization", organization)
router.use("/school", school)

module.exports = router