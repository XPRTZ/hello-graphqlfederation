import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

import resolvers from "./resolvers.js";
import { LocationsAPI } from "./datasources/locations-api.js";

const typeDefs = gql(`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key"])

  type Query {
    "The full list of locations presented by the Interplanetary Space Tourism department"
    locations: [Location!]!
    "The details of a specific location"
    location(id: ID!): Location
  }

  type Location @key(fields: "id") {
    id: ID!
    "The name of the location"
    name: String!
    "A short description about the location"
    description: String!
  }
`);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  csrfPrevention: true,
  cache: "bounded",
  dataSources: () => {
    return {
      locationsAPI: new LocationsAPI()
    };
  },
});

const port = process.env.PORT;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Locations ready at ${url}`);
}).catch(err => { console.error(err) });