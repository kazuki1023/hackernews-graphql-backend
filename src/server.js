"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        feed: () => (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.prisma.link.findMany();
        }),
    },
    Mutation: {
        post: (parent, args, context) => {
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
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
