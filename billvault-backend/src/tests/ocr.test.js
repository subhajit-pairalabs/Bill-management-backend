/**
 * @file tests/ocr.test.js
 * @description OCR pipeline: Vision API mock, structured data parsing, bill record update, WebSocket emit verification
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