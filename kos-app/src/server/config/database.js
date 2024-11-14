const { Database } = require("lucide-react");

module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'kos_app_db'),
        user: env('DATABASE_USERNAME', 'kos_app_user'),
        password: env('DATABASE_PASSWORD', 'password123'),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  });