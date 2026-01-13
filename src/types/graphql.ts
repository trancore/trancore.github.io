import type { UseQueryOptions } from "@tanstack/react-query";

export type GraphQLQueryHookOptions<TResult> = Omit<
  UseQueryOptions<TResult>,
  "queryKey" | "queryFn"
>;
