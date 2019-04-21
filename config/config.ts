module.exports = {
    development: {
        username: 'postgres',
        password: 'Dopamine1',
        database: 'postgres',
        details: {
            host: process.env.SERVER,
            port: process.env.LOCALPORT,
            dialect: process.env.DIALECT
        }
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        details: {
            host: process.env.SERVER,
            port: process.env.LOCALPORT,
            dialect: process.env.DIALECT
        }
    },
    production: {
        use_env_variable: 'Heroku Postgres',
        details: {
            dialect: 'postgres'
        }
    }
};
