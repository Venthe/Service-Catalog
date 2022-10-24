const { MarkdownParser, renderMarkdown } = require('./markdown')

const parserList = [
    {
        formatFilter: (f) => f !== undefined && f.search(/md|markdown/ig) != -1,
        formatter: (d) => new MarkdownParser().parseMarkdown(d)
    },
    {
        formatFilter: (f) => f !== undefined && f.search(/html/ig) != -1,
        formatter: document => renderMarkdown(new MarkdownParser().parseMarkdown(document))
    },
    {
        formatFilter: (f) => f === undefined || f.search(/stringify/ig),
        formatter: d => JSON.stringify(d, undefined, "  ")
    }
]

function getFormatter(format) {
    return parserList.find(parser => parser.formatFilter(format)).formatter
}

function parseOutput(file, format) {
    return getFormatter(format)(file)
}

module.exports = parseOutput