const homeConnString = {
  host: "192.168.2.211",
  user: "db_access",
  password: "freedom",
  database: "gc-mngmt",
  port: 5432
};

let connectionString = process.platform === 'win32' ? 'postgres://db_access:freedom@localhost/gc-mngmt' : 'postgres://localhost/gc-mngmt'
  
  module.exports = {
    development: {
        client: 'pg',
        connection: connectionString,
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
  