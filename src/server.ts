const { ApolloServer, gql } = require('apollo-server');

// hackerNEwsの１つ１つの投稿
interface Link {
  id: string;
  description: string;
  url: string;
}
let links: Link[] = [
  {
    id: "link-0",
    description: "タイトル",
    url: "test"
  }
]
// graphqlのschema(データ構造)を読み込む
// tyoedefsで型を定義する
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: Sting!): Link!
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

  Mutation: {
    post: (parent: any, args: Link) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);
      return link
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({url}: { url: string }) => console.log(`Server is running on ${url}`));
