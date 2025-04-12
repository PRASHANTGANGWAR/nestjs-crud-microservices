export default () => ({
    product_service: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        app_port: process.env.PORT,
        internal_api_key: process.env.INTERNAL_API_KEY
    },
});
