import fs from 'fs';
import path from 'path';

export interface FileInfo {
    name: string
    parent: string
    path: string
    type: string
}

async function CrawlDirectory(dir: string) {
    const results = new Array<FileInfo>();
    const currentDirectoryList = await fs.readdirSync(dir);
    await Promise.all(currentDirectoryList.map(async (fileName) => {
        const filePath = path.resolve(dir, fileName);
        const fileStats = fs.statSync(filePath);
        if (fileStats && fileStats.isDirectory()) {
            const childrenFiles = await CrawlDirectory(filePath);
            results.push(... childrenFiles);
        } else {
            const fileInfo = {
                name: fileName,
                parent: path.basename(path.dirname(filePath)),
                path: filePath,
                type: path.extname(fileName)
            };
            results.push(fileInfo);
        }
      }));
    return results;
}

export default CrawlDirectory;