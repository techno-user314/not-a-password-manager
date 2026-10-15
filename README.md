# Not A Password Manager
A client side password generator for managing passwords.

Deterministically generates a password for you based on:
  - A memorable word or sentence that you "login" with. (This is not a true login, as it does not retrieve any server-side information, and is just used so that multiple people with the same platform code don't end up with the same password.)
  - A platform code that identifies the platform you want to generate the password for. For example, to access your Amazon password, you might use the platform code "jungle". There is no "correct" selection for this field, just use whatever word or phrase you will easily remember whenever you need to get the password for that platform.
  - An password iteration/version number that allows you to change your password without having to memorize a new platform code.

The output is determined by SHA256 hashing the concatenation of the three inputs (login + platform code + version number as a string). Then the output of the hash is converted to base64 (A-Z, a-z, 0-9, + and /) and has "B0x:" appended to the beginning (to guarantee that it passes common password security checks). That output, truncated to 20 characters, is what is shown in the output box to be copied.

> [!WARNING]
> Updates are still coming for the backend, so the password generation method is subject to change. (The current version is rather insecure.)