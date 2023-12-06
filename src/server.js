"use strict";
const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");
let links = [
    {
        id: "link-0",
        description: "タイトル",
        url: "test"
    }
];
// リゾルバ関数
// 型に対して、何かの値を返す関数(入れてあげる)
const resolvers = {
    Query: {
        info: () => `HackerNewsクローン`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        }
    }
};
const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
