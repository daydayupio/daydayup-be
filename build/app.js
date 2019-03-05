var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const logger = require("./util/logger");
const { ApolloServer, ApolloError } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const AuthController = require("./controllers/auth");
const ERROR_CODE = require("./config/errorCode");
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
        const operationName = req.body.operationName;
        if (operationName === "IntrospectionQuery" ||
            operationName === "login" ||
            operationName === "register") {
            return {};
        }
        const authorization = req.headers.authorization || "";
        const user = yield AuthController.getUserByAuthorization(authorization);
        if (!user) {
            if (!["login", "register"].includes(operationName)) {
                throw new ApolloError(ERROR_CODE.NOT_LOGIN.message, ERROR_CODE.NOT_LOGIN.code);
            }
        }
        return { user };
    }),
    formatError: error => {
        logger().error(error);
        return error;
    },
});
const app = express();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => logger().debug(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=app.js.map