/**
 * @file server.js
 */
require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        console.log('--- Initializing BillVault Backend ---');
        
        // Check Database configuration
        const { supabase } = require('./config/database');
        if (supabase) {
            console.log('✅ Supabase Client Initialized Successfully');
        }

        // Start Express Server
        app.listen(PORT, () => {
            console.log(`✅ Express Server is running on port: ${PORT}`);
            console.log('✅ Auth module loaded and routes are ready at /api/v1/auth');
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();