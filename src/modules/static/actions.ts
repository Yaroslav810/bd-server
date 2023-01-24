import fs from 'fs'
import path from 'path'
import {generateUuid} from '../../../core/application/uuid'

const PATH = '../../../images'

function isValidImage(image: File): boolean {
    if (image.name === '' || image.size === 0) {
        return false
    }
    const ext = image.name.split('.').pop()
    if (!ext) {
        return false
    }
    return ['PNG', 'JPEG', 'JPG'].includes(ext.toUpperCase())
}

async function createImage(image: File): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const buffer = image.data
    fs.mkdirSync(path.join(__dirname, PATH), {recursive: true})
    const ext = image.name.split('.').pop()
    const title = generateUuid() + '.' + ext
    await fs.writeFileSync(path.join(__dirname, PATH, title), buffer)
    return title
}

export {
    isValidImage,
    createImage
}
