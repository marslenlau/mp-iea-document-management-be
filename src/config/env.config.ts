export const EnvConfiguration = () => ({
    environrment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 4000,

    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    EMAIL_USER: process.env.EMAIL_USER || 'umsa@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || '12345',
    EMAIL_FROM: process.env.EMAIL_FROM || 'umsa@gmail.com',

})