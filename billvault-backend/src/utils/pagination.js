/**
 * @file utils/pagination.js
 * @description Pagination utilities for all list endpoints.
 *
 * Supports two strategies:
 *  1. Offset pagination (page + limit) -- for simple lists
 *  2. Cursor pagination (cursor + limit) -- for infinite scroll feeds
 *
 * Exports:
 *  - parsePaginationParams(query) => { page, limit, offset }
 *  - buildPaginationMeta(total, page, limit) => { total, totalPages, currentPage, hasNext, hasPrev }
 *  - buildCursorMeta(results, limit) => { nextCursor, hasMore }
 *
 * @layer Utils
 */