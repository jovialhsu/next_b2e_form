const config = {
    slbcheck: 'ok',
    version: process.env.VERSION || 'V1.0.0',
    env: process.env.API_ENV || 'DEV',
    nodeEnv: process.env.NODE_ENV || 'development',
    memPlayScheme: process.env.MEM_PLAY_SCHEME || 'http',
    tripPlayScheme: process.env.TRIP_PLAY_SCHEME || 'http',
    vacationPlayScheme: process.env.VACATION_PLAY_SCHEME || 'http',
    optKeyPath: process.env.OPT_KEY_PATH || `${process.cwd()}/keys`,
    appLogLevel: process.env.APP_LOG_LEVEL || 'info',
    port: parseInt(process.env.PORT, 10) || 3000,
    // slackWebhookUrl: process.env.SLACK_WEBHOOK_URL || '',
    // captchaV2: '6Leo2coZAAAAABC8twELI159JWqrD_PzqhgRe6Tp',
    // captchaV3: '6LcATckZAAAAAAHWhjxzOqffdHpw58ZjlhbbxPlC',
};

module.exports = config;
