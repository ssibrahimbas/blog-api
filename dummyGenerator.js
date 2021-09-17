const SuperHuman = require(`./models/user/superhuman/Superhuman`)

const fs = require('fs')
const connectToMongoDB = require(`./helpers/database/mongoDB`)

const dotenv = require("dotenv");

const path = "./dummy/";

const superhuman = JSON.parse(fs.readFileSync(path + "superhuman.json"))

dotenv.config({
    path : "./config/env/config.env"
});

connectToMongoDB();

const importSuperhuman = async() => {
    try {
        await SuperHuman.create(superhuman)
        console.log("SuperHuman's created successfully")
    }catch(e) {
        console.log(e)
    }
    finally {
        process.exit();
    }
}

const destroyAllSuperhuman = async() => {
    try {
        await SuperHuman.deleteMany()
        console.log("SuperHuman's deleted successfully")
    }catch(e) {
        console.log(e)
    }
    finally {
        process.exit();
    }
}

if(process.argv[2] === "--import") {
    importSuperhuman()
}
else if (process.argv[2] === "--delete"){
    destroyAllSuperhuman();
}