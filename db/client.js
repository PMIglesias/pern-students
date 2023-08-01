const { Client } = require("pg");

// Replace 'your_database_connection_string' with your actual database connection string
const connectionString =
  "postgres://vgyidcpa:2IM_tG0RDqk5UjM2GnS1NRn7w8ADJ6wc@silly.db.elephantsql.com/vgyidcpa";
const client = new Client({ connectionString });

module.exports = client;
