import { MemMethods } from './methods.ts';

export const EMBEDDED_GET_FILE_IN_MEM = (globalThis: MemMethods, path: string | URL): Uint8Array => {
    const filePath = globalThis["getFilePath"](path);

    if(!filePath) throw new Error("Invalid Path");

    const fileInMemory = globalThis["EMBEDDED_FILE_SYSTEM"][filePath] 
        || (globalThis["EMBEDDED_FILE_SYSTEM"][`./${filePath}`] 
        || globalThis["EMBEDDED_FILE_SYSTEM"][filePath.replace("./", "")]);

    if(!fileInMemory) {
        throw new Error(`[Leaf] File not found (${filePath}).`);
    } else {
        return new Uint8Array(fileInMemory);
    }
}

export const getFileInMem = ["getFileInMem", EMBEDDED_GET_FILE_IN_MEM.toString()];