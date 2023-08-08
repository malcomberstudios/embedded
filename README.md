# Embedded
A fake file system for [Deno](https://deno.land) binaries originally by [Mandarine](https://deno.land/x/mandarinets). Repurposed by Malcomber Studios (Royston Malcomber)

## Notice
This was a fork from [mandarineorg/leaf](https://github.com/mandarineorg/leaf). 

Unfortunately I think the project is now dead, two years since a pull request and any releases. I think the project has potential. 

------------

## Description
embedded is a fake file system for Deno binaries. This means, you can save your files along with the binary generated by `deno compile`, this way, you can put all your files together in a single executable which leads to easier deployments and a more compacted deliverable output.

## Usage
Using **embedded** in your application is very simple, you just use the regular Deno APIs after you ran a 'embedded compile'. More on this below.

### embedded compile step.
The `embedded.compile()` method is responsible for creating a typescript file with your resources in it. This file is then compiled into your binary.

`embedded.compile()` takes one argument containing the options to include.

```typescript
// File: compile.ts
import { embedded } from 'https://deno.land/x/embedded@0.0.2/mod.ts';

embedded.compile({
    modulePath: "./myEntryPoint.ts",
    contentFolders: ["./resources"],
    // flags: [],
    // output: ''
})
```
`modulePath` and `contentFolders` are necessary.  

- `modulePath`: File to be compiled into a binary.
- `contentFolders`: Folders to be attached to the binary.
- `flags` *optional*: the Deno flags normally used for `deno compile`.
- `output` *optional*: Replaces the `--output` flags option.

### readFileSync
Synchronously reads and returns the entire contents of a file as an array of bytes. `TextDecoder` can be used to transform the bytes to string if required. Reading a directory returns an empty data array.

```typescript
const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("hello.txt");
console.log(decoder.decode(data));
```

### readFile
Reads and returns the entire contents of a file as an array of bytes. `TextDecoder` can be used to transform the bytes to string if required. Reading a directory returns an empty data array.

```typescript
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("hello.txt");
console.log(decoder.decode(data));
```

### readTextFileSync
Synchronously reads and returns the entire contents of a file as utf8 encoded string.
```typescript
const data = Deno.readTextFileSync("hello.txt");
console.log(data);
```

### readTextFile
Reads and returns the entire contents of a file as utf8 encoded string.
```typescript
const data = await Deno.readTextFile("hello.txt");
console.log(data);
```

-----------------
## Example

### Compile the binary

We **run** the `compile.ts` script which creates the file system `.ts` which then runs `deno compile` to build the final binary.

```typescript
// compile.ts
import { embedded } from 'https://deno.land/x/embedded@0.0.2/mod.ts';

embedded.compile({
    modulePath: "./myEntryPoint.ts",
    contentFolders: ["./resources"]
})
```

_./resources/hello.txt_
```text
Hello World
```

_myEntryPoint.ts:_
```typescript

console.log(Deno.readTextFileSync("./resources/hello.txt"));
```

```shell
deno run --allow-all --unstable compile.ts
```
```shell
./myEntryPoint (.exe if windows)
# output: Hello World
```
-----------------

# Todo

There's things outstanding that I would like to complete.

- All read filesystem functions support
- Test with web frameworks such as oak
- Improve performance
- Improve options when compiling
- Create a portable binary to embed from command line
- Create a way to still use original filesystem functions