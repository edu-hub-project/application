module.exports = {
  client: {
    service: {
      name: "hasura",
      url: process.env.API_URL
        ? process.env.API_URL + "/v1/graphql"
        : "http://localhost:8080/v1/graphql",
    },
  },
};