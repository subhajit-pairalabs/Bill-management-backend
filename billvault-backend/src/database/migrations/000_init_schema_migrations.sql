-- database/migrations/000_init_schema_migrations.sql
-- Create schema_migrations tracking table

CREATE TABLE IF NOT EXISTS schema_migrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    migration_name TEXT NOT NULL UNIQUE,
    checksum TEXT,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
    executed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
