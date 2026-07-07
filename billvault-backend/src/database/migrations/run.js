/**
 * @file database/migrations/run.js
 * @description Migration Runner. Connects to PostgreSQL, reads .sql files in /migrations,
 * and executes pending migrations transactionally. Ensures immutable migrations.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const crypto = require('crypto');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ ERROR: DATABASE_URL environment variable is required to run migrations.");
    process.exit(1);
}

// Environment-aware SSL configuration
const isProduction = process.env.NODE_ENV === 'production';
const pool = new Pool({
    connectionString,
    ssl: isProduction ? { rejectUnauthorized: true } : false
});

const getChecksum = (content) => crypto.createHash('md5').update(content).digest('hex');

const runMigrations = async () => {
    const client = await pool.connect();
    console.log(`--- Starting Migration Runner (${isProduction ? 'Production' : 'Development'} mode) ---`);
    
    try {
        // Ensure migration table exists
        const initSqlPath = path.join(__dirname, '000_init_schema_migrations.sql');
        const initSql = fs.readFileSync(initSqlPath, 'utf8');
        await client.query(initSql);
        
        // Get all .sql files in this directory, excluding run.js and 000
        const files = fs.readdirSync(__dirname)
            .filter(f => f.endsWith('.sql') && f !== '000_init_schema_migrations.sql')
            .sort();

        // Get executed migrations
        const { rows: executedRows } = await client.query('SELECT migration_name, checksum FROM schema_migrations WHERE status = $1', ['SUCCESS']);
        const executedMigrations = new Map(executedRows.map(row => [row.migration_name, row.checksum]));

        for (const file of files) {
            const filePath = path.join(__dirname, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const checksum = getChecksum(content);

            if (executedMigrations.has(file)) {
                if (executedMigrations.get(file) !== checksum) {
                    throw new Error(`CRITICAL: Checksum mismatch for already executed migration ${file}. Migrations are immutable and cannot be modified after execution.`);
                }
                console.log(`⏩ Skipping ${file} (Already executed)`);
                continue;
            }

            console.log(`⏳ Executing ${file}...`);
            await client.query('BEGIN');
            try {
                // Insert tracking record as PENDING
                const { rows: [record] } = await client.query(
                    'INSERT INTO schema_migrations (migration_name, checksum, status) VALUES ($1, $2, $3) RETURNING id',
                    [file, checksum, 'PENDING']
                );
                
                // Execute migration content
                await client.query(content);
                
                // Update tracking record to SUCCESS
                await client.query(
                    'UPDATE schema_migrations SET status = $1, executed_at = CURRENT_TIMESTAMP WHERE id = $2',
                    ['SUCCESS', record.id]
                );
                
                await client.query('COMMIT');
                console.log(`✅ Success ${file}`);
            } catch (err) {
                await client.query('ROLLBACK');
                console.error(`❌ FAILED executing ${file}:`, err.message);
                
                // Attempt to log failure
                try {
                    await client.query(
                        'INSERT INTO schema_migrations (migration_name, checksum, status) VALUES ($1, $2, $3) ON CONFLICT (migration_name) DO UPDATE SET status = EXCLUDED.status',
                        [file, checksum, 'FAILED']
                    );
                } catch (logErr) {
                    console.error("⚠️ Could not log failure to schema_migrations:", logErr.message);
                }
                
                throw new Error(`Migration ${file} failed. Execution halted.`);
            }
        }
        
        console.log("--- ✅ All Migrations Complete ---");
    } catch (error) {
        console.error("\n❌ FATAL ERROR IN MIGRATION RUNNER:");
        console.error(error.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
};

runMigrations();
