import {existsSync, mkdirSync, readFileSync} from "node:fs";

export const makeDirectory = (directoryPath: string) => {
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, {recursive: true});
    }
}

export const getFileContents = (filePath: string): string | undefined => {
    if (existsSync(filePath)) {
        return readFileSync(filePath, 'utf8');
    }
}