import {promises as fs } from "fs"
import path from "path"

const deleteImage = async(fileName) => {
    try {
        const __dirname = path.resolve();
        const filePath = path.join(__dirname , "/uploads" , fileName)

        await fs.unlink(filePath)
        console.log("Image is deleted")

    } catch (error) {
        throw error;
    }
}

export default deleteImage