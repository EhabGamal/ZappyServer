const env = process.env.NODE_ENV || 'development';

const config = {
    'development': {
        port: process.env.PORT || 3000,
        db: 'mongodb://127.0.0.1:27017/zappy',
    },
    'test': {

    },
    'production': {
        port: process.env.PORT || 3000,
        db: process.env.MONGO_URI || '',
    }
}

module.exports = config[env];