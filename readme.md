## pwnchk

small wrapper for [pwnedpasswords](api.pwnedpasswords.com) to check if a password has been pwned

### usage

- from cli

  `npx pwnchk <password>`

- from code

  ```typescript
  import { checkInput } from "pwnchk";
  const result = await checkInput("password");
  console.table(result);
  ```

### refs:

- https://haveibeenpwned.com/API/v2#PwnedPasswords
- https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/
