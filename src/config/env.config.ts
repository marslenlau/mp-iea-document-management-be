export const EnvConfiguration = () => ({
    environrment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 4000,
})