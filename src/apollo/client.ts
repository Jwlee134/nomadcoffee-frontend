import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { TOKEN } from "./vars";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => ({
  headers: { ...headers, token: localStorage.getItem(TOKEN) || "" },
}));

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://nomadcoffee-backend-jw.herokuapp.com/graphql",
});

export default new ApolloClient({
  link: authLink.concat(errorLink).concat(uploadHttpLink),
  cache: new InMemoryCache(),
});
