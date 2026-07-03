/**
 * @file utils/search.js
 * @description Full-text search utilities for PostgreSQL tsvector queries.
 *
 * Exports:
 *  - buildTsQuery(searchTerm)           sanitize and format for to_tsquery()
 *  - buildSearchFilters(params)         construct WHERE clause fragments from filter params
 *  - highlightSnippet(text, term)       extract relevant snippet with match highlighted
 *
 * Used by: search.service.js, bill.repository.js
 *
 * @layer Utils
 */