import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import { useGraphQLQuery } from "~/hooks/useGraphqlQuery";
import type { GraphQLQueryHookOptions } from "~/types/graphql";
import type { RequestDocument, Variables } from "graphql-request";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN_KEY;

/**
 * GitHub GraphQL APIと通信するためのカスタムフック
 *
 * @param document - graphql-codegenで生成されたTypedDocumentNode
 * @param variables - クエリ変数
 * @param options - TanStack Queryの追加オプション
 * @example
 * ```tsx
 * import { useFetchGitHub } from '~/hooks/useFetchGitHub';
 * import { RepositoryOwnerDocument } from "~/graphql/github/query-generated/graphql";
 *
 * const UserProfile = () => {
 *   const { data, isLoading, error } = useFetchGitHub(RepositoryOwnerDocument);
 *
 *   if (isLoading) return <p>Loading...</p>;
 *   if (error) return <p>An error has occurred: {error.message}</p>;
 *
 *   return (
 *     <div>
 *       <img src={data?.user?.avatarUrl} alt={data?.user?.name ?? ''} />
 *       <h1>{data?.user?.name}</h1>
 *     </div>
 *   );
 * }
 * ```
 */
export const useFetchGitHub = <TResult, TVariables extends Variables>(
  document: RequestDocument | TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: GraphQLQueryHookOptions<TResult>,
) => {
  return useGraphQLQuery(
    GITHUB_GRAPHQL_ENDPOINT,
    document,
    variables,
    {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    options,
  );
};
