#!/usr/bin/env node

import { checkInput } from "./checker";

const run = async () => {
  const input = process.argv[2];
  if (!input) {
    console.error('No input provided');
    return;
  }

  const result = await checkInput(input);

  if (result.error) {
    console.error(result.error);
  }
  else {
    console.table(result);
  }
};

run();