import * as express from "express"
import { logger } from "./util/logger"
import { ApolloServer, ApolloError } from "apollo-server-express"
import { schema as typeDefs } from "./graphql/schema"
import * as resolvers from "./graphql/resolvers"
import { AuthController } from "./controllers/auth"
import * as ERROR_CODE from "./config/errorCode"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const operationName = req.body.operationName
        if (
            operationName === "IntrospectionQuery" ||
            operationName === "login" ||
            operationName === "register"
        ) {
            return {}
        }
        const authorization = req.headers.authorization || ""
        const user = await AuthController.getUserByAuthorization(authorization)
        if (!user) {
            if (!["login", "register"].includes(operationName)) {
                throw new ApolloError(
                    ERROR_CODE.NOT_LOGIN.message,
                    ERROR_CODE.NOT_LOGIN.code
                )
            }
        }
        return { user }
    },
    formatError: error => {
        logger().error(error)
        return error
    },
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
    logger().debug(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    )
)
