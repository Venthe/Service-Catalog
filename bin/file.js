const path = require('path')
const fs = require('fs')

function readFile(filename) {
    const absolutePath = path.resolve(process.cwd(), filename)
    return fs.readFileSync(absolutePath, 'utf8')
}

function saveFile(document, path) {
    fs.writeFile(path, document, function (err, data) {
        if (err) {
            return console.error(err);
        }
    })
}

module.exports = { readFile, saveFile }
