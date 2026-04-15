import { resolve } from 'path';
import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '.env.local') });

const directUrl = process.env.DIRECT_URL;

if (!directUrl) {
    throw new Error('DIRECT_URL environment variable is not set. Please check your .env.local file.');
}

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: directUrl,  // Use DIRECT_URL (port 5432) for migrations
    },
});