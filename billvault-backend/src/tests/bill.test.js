/**
 * @file tests/bill.test.js
 * @description Bill module: create bill (file mock), list with filters and pagination, update, soft-delete, restore, signed URL generation
 *
 * Testing approach:
 *  - Framework       : Jest
 *  - HTTP integration: supertest
 *  - Database        : test database or in-memory mock
 *  - External APIs   : mocked with jest.mock() / nock
 *  - BullMQ queues   : mocked (no real Redis required in unit tests)
 *
 * @layer Tests
 */