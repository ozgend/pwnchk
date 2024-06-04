#!/usr/bin/env node

import { checkInput } from "./checker";

const run = async () => {
  const input = process.argv[2];
  if (!input) {
    console.log('\x1b[31m%s\x1b[0m', '>> no input provided');
    return;
  }

  const result = await checkInput(input);

  if (result.error) {
    console.log('\x1b[31m%s\x1b[0m', result.error);
  }
  else {

    if (result.match) {
      console.log('\x1b[31m%s\x1b[0m', '>> pwned - input hash is found in the pwn list');
    }
    else {
      console.log('\x1b[32m%s\x1b[0m', '>> input hash did not found in the pwn list');
    }

    console.log('');
    console.log('hash:'.padStart(12, ' '), result.hash);
    console.log('hashIndex:'.padStart(12, ' '), result.hashIndex);
    console.log('hashSuffix:'.padStart(12, ' '), result.hashSuffix);
    console.log('url:'.padStart(12, ' '), result.url);
    console.log('views:'.padStart(12, ' '), result.views);
    console.log('match:'.padStart(12, ' '), result.match);

    // console.table(result);
  }
};

run();