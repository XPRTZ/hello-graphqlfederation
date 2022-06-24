# Hello GraphQL Federation

## Setup

- Clone the repository
- Rename .env.sample to .env in the directories apps/gateway, apps/locations and apps/reviews
- Run ```yarn install``` in the root of the repository
- Run ```yarn dev``` to start the services all at once

## Project structure

- gateway: the Apollo Gateway which connects the subgraphs together. Available at http://localhost:4000

- locations: the subgraph for Locations. Available at http://localhost:4001

- reviews: the subgraph for revies. Available at http://localhost:4002 

- Api: contains the source of the data for both subgraphs. A simple REST server for Locations and Reviews. Available at localhost:3000

## Usage

Open http://localhost:4000 and test the following queries

### Get locations
This query gets data from only the locations subgraph.

```graphql
query Locations {
  locations {
    id
    name
    description
  }
}
```

### Latest Reviews
This query gets data from only the reviews subgraph.

```graphql
query Locations {
  locations {
    id
    name
    description
  }
}
```

### Latest Reviews With OverallRating
This query gets data from the reviews subgraph and adds data to location from within the reviews subgraph. The added data runs in the context of reviews.

```graphql
query LatestReviewsWithOverallRating {
  latestReviews {
    id
    comment
    rating
    location {
      name
      overallRating
      reviewsForLocation {
        comment
      }
    }
  }
}
```

### Reviews for location
This query get data for locations but from the reviews subgraph. This runs in the context of locations.

```graphql
query ReviewsForLocations {
  locations {
    reviewsForLocation {
      comment
      rating
    }
    overallRating
  }
}
```