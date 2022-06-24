import { RESTDataSource } from "apollo-datasource-rest";

export class LocationsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }

  async getLocation(id) {
    return await this.get(`locations/${encodeURIComponent(id)}`);
  }

  async getLocations() {
    return await this.get(`locations/`);
  }
}
