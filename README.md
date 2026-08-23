# Not A Password Manager
A client side password generator for managing passwords.

Deterministically generates a password for you based on:
  - A "key string" - A memorable word or sentence connected to the platform you are logging into.
  - A "salt value" - This can be the same for every password you generate, and ensures that your password is unique to you.
  - An "iteration number" - This allows you to change the password every 3 months (or whatever you do) without compromising memorability.

The output is determined by SHA256 hashing the concatenation of the three inputs (key string + salt value + iteration number as a string). Then the output of the hash is converted to base64 (A-Z, a-z, 0-9, + and /) and has "B0x:" appended to the beginning (to guarantee that it passes common password security checks). That output, truncated to 20 characters, is what is shown in the output box to be copied.
