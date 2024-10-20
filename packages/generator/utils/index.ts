import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {parseXml, stringifyXml} from "../xml";
import { dirname } from "node:path";

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

export const loadFile = <T>(filename: string): T | undefined => {
    const file = getFileContents(filename);
    if (file) {
        return parseXml<T>(file);
    }
}

export const saveFile = (filename: string, fileContents: any ) => {
    const dir = dirname(filename);

    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    const fileText = stringifyXml(fileContents);
    writeFileSync(filename, fileText);
}

export const version = {
    major: 4,
    minor: 7,
    revision: 1,
    build: 3,
}