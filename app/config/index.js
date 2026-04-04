const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contactbook",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "your_secret_key_change_this_in_production",
        expiresIn: "7d",
    },
};
module.exports = config;