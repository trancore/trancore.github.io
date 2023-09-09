import { cacheExchange, createClient, fetchExchange } from "urql";

export const githubClient = createClient({
  url: "https://api.github.com/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = "";
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
