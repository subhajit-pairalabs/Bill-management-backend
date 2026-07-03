/**
 * @file tests/email.test.js
 * @description Email import: Gmail OAuth flow mock, sync worker mock (fixture emails), attachment parsing, bill draft creation
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