const homeConnString = {
  host: "192.168.2.211",
  user: "db_access",
  password: "freedom",
  database: "gc-mngmt",
  port: 5432
};
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = process.env

const dockerConnectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

let connectionString = process.platform === 'win32' ? 'postgres://db_access:freedom@localhost/gc-mngmt' : 'postgres://localhost/gc-mngmt'
const devConnString = `postgres://db_access:freedom@localhost:5433/gc-mngmt`

module.exports = {
    test: {
    client: 'pg',
    connection: dockerConnectionString,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
    development: {
        client: 'pg',
        connection: dockerConnectionString,
        migrations: {
            directory: __dirname + '/db/migrations',
          },
        seeds: {
            directory: __dirname + '/db/seeds',
          },
      },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
          },
        seeds: {
            directory: __dirname + '/db/seeds',
          },
      },
  };
  