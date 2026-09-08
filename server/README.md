Mini Task Manager (Next.js frontend + Express/MySQL backend)

Prerequisites: Node.js, MySQL running locally
Setup — database: create DB, run mysql -u root -p sys < server/schema.sql
Setup — server: cd server && npm install, set DB credentials (env vars or edit config), node index.js → runs on http://localhost:5000
Setup — client: cd client && npm install && npm run dev → runs on http://localhost:3000
Note that the client talks to the server at http://localhost:5000 (hardcoded in the axios calls), so both must be running together locally.