const fs = require('fs')

const removeFile = (file) => {
    fs.unlink(file, err => {
        if(!!err) return "An error occurred while deleting the file"
        return true
    })
}

module.exports = {
    removeFile
}