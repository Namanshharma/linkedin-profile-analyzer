import { config } from "dotenv";
import { resolve } from "path";
import { Pool } from "pg";

config({ path: resolve(__dirname, '../.env.local') });

async function testPassword() {
    console.log('Testing connection...');

    const rawDatabaseUrl = process.env.DATABASE_URL;
    const rawDirectUrl = process.env.DIRECT_URL;

    console.log('Raw DATABASE_URL exists:', !!rawDatabaseUrl);
    console.log('Raw DIRECT_URL exists:', !!rawDirectUrl);

    // Use DIRECT_URL for migrations (port 5432)
    const connectionString = rawDirectUrl || rawDatabaseUrl;

    if (!connectionString) {
        console.error('❌ No connection string found in .env.local');
        return;
    }

    console.log('Connection string (partial):', connectionString);

    const pool = new Pool({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        const client = await pool.connect();
        const result = await client.query('Select now() as time, current_database() as database');
        console.log('✅ Connection successful!');
        console.log('Database:', result.rows[0].database);
        console.log('Server time:', result.rows[0].time);
        client.release();
        pool.end();
    } catch (error) {
        console.error('Error testing password connection:', error);
    }
}

testPassword();