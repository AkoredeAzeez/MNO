module.exports = ({ env }) => {
  // unset => honor sslmode in the connection string (e.g. Railway's sslmode=require)
  const sslMode = env("DATABASE_SSL");
  return {
    connection: {
      client: "postgres",
      connection: {
        connectionString: env("DATABASE_URL"),
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "redraw_strapi"),
        user: env("DATABASE_USERNAME", "redraw_user"),
        password: env("DATABASE_PASSWORD", "YourSecurePassword123"),
        ssl: sslMode === undefined ? undefined : sslMode === "true",
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
