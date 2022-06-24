import { RESTDataSource } from "apollo-datasource-rest";

export class ReviewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }

  async getReview(id) {
    return await this.get(`reviews/${encodeURIComponent(id)}`);
  }

  async getReviews() {
    return await this.get(`reviews/`);
  }

  async getReviewsForLocation(locationId) {
    var reviews = await this.get(`reviews/`);
    return reviews.filter(r => r.locationId == locationId);
  }
}
