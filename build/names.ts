import path from 'path'
import url from 'url'

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default dirname
