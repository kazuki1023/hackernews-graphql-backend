const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// リゾルバ関数
// 型に対して、何かの値を返す関数(入れてあげる)
const resolvers = {
  Query: {
    info: () => `HackerNewsクローン`,
    feed: () => async (parent: any, args: any, context: any) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    post: (parent: any, args: any, context: any) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        }
      });
      return newLink;
    }
  }
};

// contextを設定してあげることで、リゾルバ関数の中でcontextを使えるようになる
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  }
});

server.listen().then(({url}: { url: string }) => console.log(`Server is running on ${url}`));
