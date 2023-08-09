import * as path from 'https://deno.land/std@0.161.0/path/mod.ts';
import { parse } from 'https://deno.land/std@0.194.0/flags/mod.ts';
import { assert } from 'https://deno.land/std@0.197.0/assert/assert.ts';

import { embedded } from './embedded.ts';
import { log } from './utils/log.ts';

const flags = parse(Deno.args, {
  string: ["help", "module", "content", "output"],
  alias: {
    h: "help",
    m: "module",
    c: "content",
    o: "output",
  },
});

try {
  assert(flags.module, "Module is empty, did you forget to provide a module?");
  assert(
    flags.content,
    "Content is empty, did you forget to provide a content folder?"
  );

  flags.module = path.resolve(Deno.cwd(), flags.module);
  flags.content = path.resolve(Deno.cwd(), flags.content);
  log.info(flags.module);
  log.info(flags.content);

  if(flags.output){
  flags.output = path.resolve(Deno.cwd(), flags.output);
    log.info(`Outputting to ${flags.output}`);
  }

  embedded.compile({
    modulePath: flags.module,
    contentFolders: [flags.content],
    flags: flags._ as string[] | undefined,
    output: flags.output,
  });
} catch (err) {
  if (err.message) log.danger(err.message);
  else
    log.danger(err);
}
