const env = process.env.NODE_ENV || 'development';

const config = {
    'development': {
        port: process.env.PORT || 3000,
        db: 'mongodb://127.0.0.1:27017/zappy',
        secret: process.env.JWT_SECRET || '~!@#$%[L+R=J]^&*()',
        users: [{
            id: 1,
            name: 'zappytpk',
            password: 'F!cti0n.F0ne'
        }],
        socialAuth: {
            twitter: {
                consumer_key: 'your-twitter-consumer-key',
                consumer_secret: 'your-twitter-consumer-secret',
                access_token_key: 'your-twitter-access-token-key',
                access_token_secret: 'your-twitter-access-token-secret'
            },
            slack: {
                token: 'your-slack-token'
            }
        }
    },
    'test': {

    },
    'production': {
        port: process.env.PORT || 3000,
        db: process.env.MONGODB_URI || '',
        secret: process.env.JWT_SECRET || '~!@#$%[L+R=J]^&*()',
        users: [{
            id: 1,
            name: 'zappytpk',
            password: 'F!cti0n.F0ne'
        }],
        socialAuth: {
            twitter: {
                consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
                access_token_key: process.env.TWITTER_TOKEN_KEY || '',
                access_token_secret: process.env.TWITTER_TOKEN_SECRET || ''
            },
            slack: {
                token: process.env.SLACK_TOKEN || 'your-slack-token'
            }
        }
    }
}

module.exports = config[env];