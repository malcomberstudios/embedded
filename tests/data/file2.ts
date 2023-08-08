import { embedded } from '../../embedded.ts';

embedded.compile({ 
    modulePath: "./tests/data/file.ts", 
    contentFolders: ["./tests"] 
});