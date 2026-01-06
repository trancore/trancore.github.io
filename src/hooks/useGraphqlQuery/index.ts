import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery } from "@tanstack/react-query";

import type { GraphQLQueryHookOptions } from "~/types/graphql";
import {
  GraphQLClient,
  type RequestDocument,
  type RequestOptions,
  type Variables,
} from "graphql-request";

/**
 * 任意のGraphQLエンドポイントと通信するための汎用的なカスタムフック
 * @param endpoint - GraphQL APIのエンドポイントURL
 * @param document - graphql-codegenで生成されたTypedDocumentNode
 * @param variables - クエリ変数
 * @param requestHeaders - リクエストヘッダー
 * @param options - TanStack Queryの追加オプション
 * @example
 * ```tsx
 * import { useGraphQLQuery } from '~/hooks/useGraphqlQuery';
 * import { graphql } from '~/graphql/github/query-generated/gql';
 *
 * const REPOSITORY_OWNER_QUERY = graphql(`
 *   query RepositoryOwner($login: String!) {
 *     repositoryOwner(login: $login) {
 *       login
 *       avatarUrl
 *     }
 *   }
 * `);
 *
 * const MyComponent = () => {
 *   // GITHUB_TOKENはViteの場合、`import.meta.env.VITE_GITHUB_TOKEN` のように環境変数として定義する必要があります
 *   const GITHUB_TOKEN = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN';
 *   const { data, isLoading, error } = useGraphQLQuery(
 *     'https://api.github.com/graphql',
 *     REPOSITORY_OWNER_QUERY,
 *     { login: 't-keshi' },
 *     { authorization: `Bearer ${GITHUB_TOKEN}` }
 *   );
 *
 *   if (isLoading) return 'Loading...';
 *   if (error) return `Error! ${error.message}`;
 *
 *   return (
 *     <div>
 *       <p>{data?.repositoryOwner?.login}</p>
 *       <img src={data?.repositoryOwner?.avatarUrl as string} alt="avatar" />
 *     </div>
 *   );
 * };
 * ```
 */
export const useGraphQLQuery = <TResult, TVariables extends Variables>(
  endpoint: string,
  document: RequestDocument | TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  requestHeaders?: HeadersInit,
  options?: GraphQLQueryHookOptions<TResult>,
) => {
  const client = new GraphQLClient(endpoint);

  return useQuery<TResult>({
    // エンドポイント、クエリ名、変数から一意なクエリキーを生成
    queryKey: [endpoint, document.toString, variables],
    queryFn: async ({ signal }) => {
      const requestOptions = {
        document,
        signal,
        ...(variables !== undefined && { variables }),
        ...(requestHeaders !== undefined && { requestHeaders }),
      } as RequestOptions<TVariables, TResult>;
      return client.request(requestOptions);
    },

    ...options,
  });
};
