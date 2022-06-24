import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

import resolvers from "./resolvers.js";
import { ReviewsAPI } from "./datasources/reviews-api.js";

const typeDefs = gql(`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key"])

  type Query {
    latestReviews: [Review!]!
  }

  type Location @key(fields: "id") {
    id: ID!
    "The calculated overall rating based on all reviews"
    overallRating: Float
    "All submitted reviews about this location"
    reviewsForLocation: [Review]!
  }

  type Review @key(fields: "id") {
    id: ID!
    "Written text"
    comment: String
    "A number from 1 - 5 with 1 being lowest and 5 being highest"
    rating: Int
    "The location the review is about"
    location: Location
  }
`);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  csrfPrevention: true,
  cache: "bounded",
  dataSources: () => {
    return {
      reviewsAPI: new ReviewsAPI()
    };
  },
});

const port = process.env.PORT;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Reviews ready at ${url}`);
}).catch(err => { console.error(err) });