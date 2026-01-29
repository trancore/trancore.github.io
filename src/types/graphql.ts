import type { UseQueryOptions } from "@tanstack/react-query";

/** GraphQLクエリ用のReact Queryフックのオプション型 */
export type GraphQLQueryHookOptions<TResult> = Omit<
  UseQueryOptions<TResult>,
  "queryKey" | "queryFn"
>;
