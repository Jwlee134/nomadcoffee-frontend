import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://nomadcoffee-backend-jw.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
