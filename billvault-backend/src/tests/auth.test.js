/**
 * @file tests/auth.test.js
 * @description Auth module: register flow, login, JWT issuance, token refresh, logout + blacklist, OTP verify, Google OAuth callback mock
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