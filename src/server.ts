const { ApolloServer, gql } = require('apollo-server');

// graphqlのschema(データ構造)を読み込む
// tyoedefsで型を定義する
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// リゾルバ関数
// 型に対して、何かの値を返す関数(入れてあげる)
const resolvers = {
  Query: {
    info: () => `HackerNewsクローン`
  },
};
