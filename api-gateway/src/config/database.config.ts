export default () => ({
    api_gateway: {
        user_service_url: process.env.USER_SERVICE_URL,
        product_service_url: process.env.PRODUCT_SERVICE_URL,
        app_port: parseInt(process.env.PORT!, 10),
        internal_api_key: process.env.INTERNAL_API_KEY
    },
});
