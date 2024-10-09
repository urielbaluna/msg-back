const {createClient} = requiere('@libsql/client');
const client = createClient({
    host: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN,
});