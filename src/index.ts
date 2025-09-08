import express from "express";
import { ApolloServer } from "@apollo/server";
import { userResolvers } from "./user/user.resolver";
import { userTypeDefs } from "./user/user.typeDefs";
import { expressMiddleware } from "@as-integrations/express4";
import { postTypeDefs } from "./Posts/post.typedefs";
import { postResolvers } from "./Posts/post.resolvers";

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs],
    resolvers: [userResolvers, postResolvers],
  });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
