const resolvers = {
  Location: {
    __resolveReference(reference, { dataSources }) {
      return dataSources.locationsAPI.getLocation(reference.id);
    }
  },
  Query: {
    location: async (_, { id }, { dataSources }) => {
      return await dataSources.locationsAPI.getLocation(id);
    },
    locations: async (_, __, { dataSources }) => {
      return await dataSources.locationsAPI.getLocations();
    }
  },
};

export default resolvers; 