import { FC, ComponentProps, useMemo } from "react";

import { useQuery } from "urql";

import { framerMotion } from "~/libs/framer-motion";
import {
  RepositoryOwnerDocument,
  RepositoryOwnerQuery,
} from "~/libs/graphql/generated/graphql";

import { SimpleAnimation } from "~/components/common/animation/SimpleAnimation";
import { Repository } from "~/components/ui/repository/Repository";

import classes from "~/components/pages/products/Products.module.scss";

const DEFAULT_DELAY_SECOND = 0.5;

export const Products: FC = () => {
  const [{ data, fetching }] = useQuery<RepositoryOwnerQuery>({
    query: RepositoryOwnerDocument,
  });

  const repositories = useMemo<
    ComponentProps<typeof Repository>["repository"][] | undefined
  >(() => {
    return data?.repositoryOwner?.repositories.edges
      ?.filter((edge) => {
        return edge?.node?.owner.login === "trancore";
      })
      .map((edge) => {
        return {
          readme:
            (edge?.node?.object?.__typename === "Blob" &&
              edge?.node?.object?.text) ||
            "null",
          name: edge?.node?.name || "",
          description: edge?.node?.description || "",
          codeLanguage: {
            language: edge?.node?.primaryLanguage?.name || "",
            clolr: edge?.node?.primaryLanguage?.color || "",
          },
        };
      });
  }, [data]);

  const { animationProperty } = framerMotion();

  const animationProps = animationProperty.riseFromBelow.animate;

  const getTransitionProps = (delay: number) => {
    return { ...animationProperty.riseFromBelow.transition, delay: delay };
  };

  return (
    <div className={classes.content}>
      <SimpleAnimation
        componentType="p"
        animateProps={animationProps}
        transitionProps={getTransitionProps(DEFAULT_DELAY_SECOND)}
      >
        Products
      </SimpleAnimation>
      {fetching ? (
        <></>
      ) : (
        <div className={classes["repository-box"]}>
          {repositories?.map((repository, index) => (
            <div key={repository.name} className={classes.repository}>
              <SimpleAnimation
                componentType="div"
                animateProps={animationProps}
                transitionProps={getTransitionProps(
                  DEFAULT_DELAY_SECOND + (index + 1) * DEFAULT_DELAY_SECOND,
                )}
              >
                <Repository key={repository.name} repository={repository} />
              </SimpleAnimation>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
