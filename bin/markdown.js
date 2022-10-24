var md = require('markdown-it')();
const { EOL } = require('os');

const LIST = "-"

const renderMarkdown = (document) => md.render(document)

class MarkdownParser {
    result = []

    static bold = (value) => `**${value}**`
    static italic = (value) => `_${value}_`

    static link(url, text) {
        if (url === undefined)
            throw new Error()
        return `[${text ?? url}](${url})`
    }

    listElement(data, li = 0) {
        const liSize = li * 2

        const u = (Array.isArray(data) ? data : [data])
            .map((a, i) => " ".repeat(liSize) + (i === 0 ? `${LIST} ` : "  ") + a)
        return u.map(v => `${v}  `).join(EOL)
    }

    renderOwner(owner) {
        const r = []
        if (owner === undefined)
            throw new Error()

        if (owner.name)
            r.push(`${MarkdownParser.bold("Name:")} ${owner.name}`)
        if (owner.type === "Email") {
            r.push(`${MarkdownParser.bold("Email:")} ${MarkdownParser.link(owner.value, owner.value)}`)
        } else {
            r.push(`${MarkdownParser.bold("Value:")} ${owner.value}`)
        }

        if (owner.role)
            r.push(`${MarkdownParser.bold("Role:")} ${owner.role}`)

        this.text(this.listElement(r))
    }

    javascript(v) {
        this.result.push(`\`\`\`json${EOL}${JSON.stringify(v, undefined, "  ")}${EOL}\`\`\``)
    }

    parseTree(data, indent = 1, li = 0) {
        const newIndent = indent + 1;

        const boolean = () => {
            const bV = () => {
                if (data.value === true)
                    return "☑"
                if (data.value === false)
                    return "☒"
                return "☐"
            }
            this.text(this.listElement(bV() + (data.description ? ` ${data.description}` : ""), li));
        }

        if (data === undefined)
            throw new Error()
        if (data.type === "Group") {
            this.header(data.name, {
                indent, action: () =>
                    data.value.forEach(d => this.parseTree(d, newIndent, li))
            })
        } else if (data.type === "Boolean") {
            boolean();
        } else if (data.type === "Combined") {
            boolean();
            const newLi = li + 1;
            data.children.forEach(d => this.parseTree(d, newIndent, newLi))
        } else if (data.type === "Text") {
            this.text(this.listElement(data.value, li))
        } else if (data.type === "Link") {
            this.text(this.listElement(MarkdownParser.link(data.value, data.name), li))
        } else {
            this.javascript(data)
        }
    }

    header(data, { indent = 1, action = undefined } = {}) {
        if (data === undefined)
            throw new Error()
        this.result.push(`${"#".repeat(indent)} ${data}`)
        this.eol()
        if (action)
            action()
        this.eol()
    }

    paragraph(t) {
        if (t === undefined)
            throw new Error()
        this.text(t)
    }

    text(t) {
        if (t === undefined)
            throw new Error()
        this.result.push(t)
    }

    eol() {
        this.result.push("")
    }

    linkRenderer(v) {
        this.result.push(this.listElement(`${MarkdownParser.link(v.url, v.name)} - ${v.description}`))
    }

    parseMetadata(type, value) {
        const val = () => {
            if (type === "repository") {
                return [
                    `${MarkdownParser.bold("Repository:")} ${value.name}`,
                    `${MarkdownParser.bold("URL:")} ${MarkdownParser.link(value.url, value.url)}`
                ]
            } else if (type === "deployments") {
                return [
                    `${MarkdownParser.bold("Identifier:")} ${value.identifier}`,
                    `${MarkdownParser.bold("Cluster:")} ${value.cluster}`,
                    `${MarkdownParser.bold("Type:")} ${value.type}`
                ]
            } else if (type === "onCall") {
                if (value.type !== "GrafanaOnCall")
                    throw new Error()
                return [
                    `${MarkdownParser.bold("Identifier:")} ${MarkdownParser.link(`https://oncall.grafana.example.com/${value.identifier}`, `${value.identifier}`)}`,
                    `${MarkdownParser.bold("Type:")} Grafana on call`
                ]
            } else {
                throw new Error()
            }
        }

        this.text(this.listElement(val()))
    }

    renderMetadata(value) {
        Object.keys(value)
            .map(a => ({ type: a, value: value[a] }))
            .forEach(a => a.value.forEach(b => this.parseMetadata(a.type, b)))
    }

    parseMarkdown(document) {
        this.header(document.title, { action: () => this.paragraph(document.description) })
        this.header("Tags", { action: () => this.text(document.tags.map(a => `${MarkdownParser.italic(a)}`).join(", ")), indent: 2 })
        this.header("Owners", { action: () => document.owners.forEach(v => this.renderOwner(v)), indent: 2 })
        this.header("Links", { action: () => document.links.forEach(v => this.linkRenderer(v)), indent: 2 })
        this.header("Metadata", { action: () => this.renderMetadata(document.metadata), indent: 2 })
        this.header("Custom metadata", { action: () => document.customMetadata.forEach(data => this.parseTree(data, 3)), indent: 2 })

        return this.result.join(EOL)
    }
}

module.exports = { renderMarkdown, MarkdownParser }