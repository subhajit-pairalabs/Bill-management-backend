/**
 * @file utils/helpers.js
 * @description Miscellaneous general-purpose utility functions.
 *
 * Exports:
 *  - slugify(text)              "My Bill 2024" => "my-bill-2024"
 *  - truncate(text, maxLength)  safe truncation with ellipsis
 *  - generateInviteCode(length) random alphanumeric vault invite code
 *  - generateId()               UUID v4 generation
 *  - pick(object, keys)         select subset of object properties
 *  - omit(object, keys)         exclude keys from object
 *  - sleep(ms)                  Promise-based delay (for retry logic)
 *
 * @layer Utils
 */