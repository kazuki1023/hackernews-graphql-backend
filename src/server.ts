const { ApolloServer, gql } = require('apollo-server');
const fs = require("fs");
const path = require("path");

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
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({url}: { url: string }) => console.log(`Server is running on ${url}`));
