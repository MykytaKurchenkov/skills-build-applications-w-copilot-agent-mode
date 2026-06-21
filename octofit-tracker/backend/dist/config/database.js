"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoDBURI = exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB connection configuration for octofit_db
const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB octofit_db');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('MongoDB disconnection error:', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
const getMongoDBURI = () => {
    return MONGODB_URI;
};
exports.getMongoDBURI = getMongoDBURI;
exports.default = {
    uri: MONGODB_URI,
    connect: exports.connectDatabase,
    disconnect: exports.disconnectDatabase,
    getUri: exports.getMongoDBURI
};
//# sourceMappingURL=database.js.map