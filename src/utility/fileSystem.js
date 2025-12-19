import fs from "fs"
import path from "path"

function read(FILE){
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "database", `${FILE}.json`),  "utf-8"))
}
function write(FILE, data){
    fs.writeFileSync(path.join(process.cwd(), "src", "database", `${FILE}.json`), JSON.stringify(data), "utf-8")
}

export default {
    read,
    write
}