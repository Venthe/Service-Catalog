const path = require('path')
const YAML = require('yaml')
const { readFile } = require('./file')

const parsedFileFormats = {
    YAML: {
        extensionFilter: (ext) => ext.search(/y[a]?ml/g) != -1,
        type: "YAML"
    }
}

function parseFilenameForFormat(filename) {
    const ext = path.extname(filename).replace('.', '').toLocaleLowerCase()
    if (parsedFileFormats.YAML.extensionFilter(ext))
        return parsedFileFormats.YAML.type

    throw new Error("Unsupported format mapping: ", ext)
}

function parseFormat(filename, format) {
    return format === undefined ? parseFilenameForFormat(filename) : format
}

function parse(file, format) {
    if (format === parsedFileFormats.YAML.type)
        return YAML.parse(file)

    throw new Error("Unsupported format: ", format)
}

function readInput(filename, format) {
    return parse(readFile(filename), parseFormat(filename, format))
}

module.exports = readInput