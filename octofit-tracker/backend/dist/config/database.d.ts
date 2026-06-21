export declare const connectDatabase: () => Promise<void>;
export declare const disconnectDatabase: () => Promise<void>;
export declare const getMongoDBURI: () => string;
declare const _default: {
    uri: string;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getUri: () => string;
};
export default _default;
//# sourceMappingURL=database.d.ts.map