const { ApolloServer, gql } = require('apollo-server');

// graphqlのschema(データ構造)を読み込む
// tyoedefsで型を定義する
const typeDefs = gql`
  type Query {
    info: String!
  }
`;
