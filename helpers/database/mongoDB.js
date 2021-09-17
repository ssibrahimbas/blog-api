const {connect} = require("mongoose")

const connectToMongoDB = async() => {
    try {
        await connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
        })
        console.log('MongoDB Connection Successful')
    }catch(e) {
        console.log(e)
    }
}

module.exports = connectToMongoDB