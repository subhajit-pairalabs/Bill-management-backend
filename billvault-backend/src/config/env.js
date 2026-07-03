/**
 * @file config/env.js
 * @description Environment variable loader and validator.
 * Reads .env via dotenv, validates all required keys are present,
 * and exports a typed centralised config object used across the app.
 * Application MUST fail fast on startup if any required variable is missing.
 *
 * Exports: { port, nodeEnv, db, redis, jwt, r2, firebase, google, smtp }
 *
 * @layer Config
 * @module Env
 */