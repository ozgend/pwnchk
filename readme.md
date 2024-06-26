## pwnchk

small wrapper for [pwnedpasswords api](https://haveibeenpwned.com/api) to check if a password has been pwned.

available as a cli tool or as a library on [npm/pwnchk](https://www.npmjs.com/package/pwnchk)

_**note:**
this code does not expose or send the input to any server. comparison is done locally via sha1 hash. check the official [api documentation](https://haveibeenpwned.com/API/v2#PwnedPasswords) for more details._

### usage

- **standalone cli**

  ```bash
  npx pwnchk <password>
  ```

- **from code**

  ```bash
  npm i pwnchk
  ```

  ```typescript
  import { checkInput } from "pwnchk";
  const result = await checkInput("password");
  console.table(result);
  ```

### refs:

- https://haveibeenpwned.com/API/v2#PwnedPasswords
- https://github.com/HaveIBeenPwned/PwnedPasswordsDownloader
- https://www.troyhunt.com/introducing-306-million-freely-downloadable-pwned-passwords/
