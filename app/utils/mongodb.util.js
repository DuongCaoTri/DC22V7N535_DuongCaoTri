const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

class MongoDB {
    static connect = async (uri) => {
        if (this.client) return this.client;

        // Kết nối với Mongoose
        await mongoose.connect(uri);

        // Cũng kết nối với MongoDB native client nếu cần
        this.client = await MongoClient.connect(uri);
        return this.client;
    };

    static disconnect = async () => {
        if (mongoose.connection) {
            await mongoose.disconnect();
        }
        if (this.client) {
            await this.client.close();
        }
    };
}

module.exports = MongoDB;