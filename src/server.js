"use strict";
const { ApolloServer, gql } = require('apollo-server');
// hackerNEwsの１つ１つの投稿
let links = [
    {
        id: "link-0",
        description: "タイトル",
        url: "test"
    }
];
// graphqlのschema(データ構造)を読み込む
// tyoedefsで型を定義する
const typeDefs = gql `
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;
// リゾルバ関数
// 型に対して、何かの値を返す関数(入れてあげる)
const resolvers = {
    Query: {
        info: () => `HackerNewsクローン`,
        feed: () => links,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
