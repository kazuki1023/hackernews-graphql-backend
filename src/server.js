"use strict";
const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
// リゾルバ関数
// 型に対して、何かの値を返す関数(入れてあげる)
const resolvers = {
    Query,
    Mutation,
    User,
    Link,
};
// contextを設定してあげることで、リゾルバ関数の中でprismaを使えるようになる
const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
    context: ({ req }) => {
        return Object.assign(Object.assign({}, req), { prisma, userId: req && req.headers.authenticated ? getUserId(req) : null });
    }
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
