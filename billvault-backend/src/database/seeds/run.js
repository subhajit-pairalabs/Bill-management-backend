/**
 * @file database/seeds/run.js
 * @description Seed Runner.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ DATABASE_URL required");
    process.exit(1);
}

const isProduction = process.env.NODE_ENV === 'production';
const pool = new Pool({ 
    connectionString, 
    ssl: isProduction ? { rejectUnauthorized: true } : false 
});

const runSeeds = async () => {
    const client = await pool.connect();
    console.log("--- Starting Seed Runner ---");
    
    try {
        const files = fs.readdirSync(__dirname)
            .filter(f => f.endsWith('.sql'))
            .sort();

        for (const file of files) {
            const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
            console.log(`⏳ Seeding ${file}...`);
            await client.query(content);
            console.log(`✅ Success ${file}`);
        }
        
    } catch (error) {
        console.error("Seed Runner Error:", error);
    } finally {
        client.release();
        await pool.end();
    }
};

runSeeds();
