"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger_1 = require("./util/logger");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const auth_1 = require("./controllers/auth");
const ERROR_CODE = require("./config/errorCode");
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers,
    context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
        const operationName = req.body.operationName;
        if (operationName === "IntrospectionQuery" ||
            operationName === "login" ||
            operationName === "register") {
            return {};
        }
        const authorization = req.headers.authorization || "";
        const user = yield auth_1.AuthController.getUserByAuthorization(authorization);
        if (!user) {
            if (!["login", "register"].includes(operationName)) {
                throw new apollo_server_express_1.ApolloError(ERROR_CODE.NOT_LOGIN.message, ERROR_CODE.NOT_LOGIN.code);
            }
        }
        return { user };
    }),
    formatError: error => {
        logger_1.logger().error(error);
        return error;
    },
});
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => logger_1.logger("query").debug(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=app.js.map