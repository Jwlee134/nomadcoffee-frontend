import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "https://nomadcoffee-backend-jw.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
