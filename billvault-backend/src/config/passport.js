/**
 * @file config/passport.js
 * @description Passport.js strategy configuration.
 * Configures and registers:
 *  - JwtStrategy  : validates Bearer token from Authorization header
 *  - GoogleStrategy: handles OAuth2 code exchange and user upsert
 *
 * Exports the configured passport instance for use in app.js.
 *
 * @layer Config
 * @module Passport
 * @dependency passport, passport-jwt, passport-google-oauth20
 */