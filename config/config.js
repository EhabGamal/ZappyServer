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
    },
    'test': {

    },
    'production': {
        port: process.env.PORT || 3000,
        db: process.env.MONGO_URI || '',
        secret: process.env.JWT_SECRET || '~!@#$%[L+R=J]^&*()',
        users: [{
            id: 1,
            name: 'zappytpk',
            password: 'F!cti0n.F0ne'
        }],
    }
}

module.exports = config[env];