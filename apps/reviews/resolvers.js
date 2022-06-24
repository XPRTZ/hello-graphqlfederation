const resolvers = {
  Review: {
    __resolveReference(reference, { dataSources }) {
      return dataSources.reviewsAPI.getReview(reference.id);
    },
    location: parent => parent
  },
  Location: {
    id: parent => parent.locationId,
    overallRating: async (parent, { __ }, { dataSources }) => {
      const reviews = await dataSources.reviewsAPI.getReviewsForLocation(parent.locationId || parent.id);
      const count = reviews.length;
      const sum = reviews.reduce((result, review) => result + review.rating, 0);
      
      return sum/count;
    },
    reviewsForLocation: async (parent, { __ }, { dataSources }) => {
      const reviews = await dataSources.reviewsAPI.getReviewsForLocation(parent.locationId || parent.id);
      return reviews;
    } 
  },
  Query: {
    latestReviews: async (_, { __ }, { dataSources }) => {
      return await dataSources.reviewsAPI.getReviews();
    }
  },
};

export default resolvers; 