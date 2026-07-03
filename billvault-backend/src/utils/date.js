/**
 * @file utils/date.js
 * @description Date and time utility functions.
 *
 * Exports:
 *  - formatDate(date, format)        consistent date formatting
 *  - daysBetween(date1, date2)       integer day difference
 *  - addDays(date, n)                returns new Date
 *  - isExpired(date)                 boolean past check
 *  - toUTC(date, timezone)           timezone-aware UTC conversion
 *  - getStartOfMonth(date)           for analytics monthly grouping
 *
 * @layer Utils
 * @dependency date-fns
 */