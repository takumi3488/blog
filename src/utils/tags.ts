const glob = require("glob")
const fs = require("fs")
const fm = require("front-matter")

const tags: { [key: string]: number } = {}

const files = glob.sync("content/blog/**/*.md") as string[]
files.forEach(file => {
  const data = fs.readFileSync(file, "utf-8")
  const content = fm(data).attributes as {
    title: string
    date: string
    tags: string[]
  }
  const newTags = content.tags
  newTags.forEach(newTag => {
    if (tags[newTag]) {
      tags[newTag]++
    } else {
      tags[newTag] = 1
    }
  })
})

let text = "name,amount\n"
Object.keys(tags).forEach(name=>{
  text += `${name},${tags[name]}\n`
})
fs.writeFileSync('src/utils/tags.csv',text)