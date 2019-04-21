const credentials = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE_NAME
};

module.exports = credentials;
