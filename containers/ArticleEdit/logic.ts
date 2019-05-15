import { gqClient } from '@/utils/init-apollo-client';
import {
  IMutationUpdateArticle,
  IMutationUpdateArticleVariables,
  UpdateArticleInput,
  CreateArticleInput,
  IMutationCreateArticle,
  IMutationCreateArticleVariables,
} from '@/graphql/__generated-types__';
import {
  MutationUpdateArticle,
  MutationCreateArticle,
} from '@/graphql/article';
import { ArticleStatusEnum } from '@/utils/enum';

export const updateArticle = async (article: UpdateArticleInput) => {
  const {
    data: { updateArticle },
  } = await gqClient.mutate<
    IMutationUpdateArticle,
    IMutationUpdateArticleVariables
  >({
    mutation: MutationUpdateArticle,
    variables: {
      updateArticleInput: article,
    },
  });
};

export const createArticle = async (article: CreateArticleInput) => {
  const {
    data: { createArticle },
  } = await gqClient.mutate<
    IMutationCreateArticle,
    IMutationCreateArticleVariables
  >({
    mutation: MutationCreateArticle,
    variables: {
      createArticleInput: article,
    },
  });
};

export const pushlishArticle = async () => {
  await gqClient.mutate<
    IMutationUpdateArticle,
    IMutationUpdateArticleVariables
  >({
    mutation: MutationUpdateArticle,
    variables: {
      updateArticleInput: {
        // id: draft.id!,
        id: 1,
        status: ArticleStatusEnum.Published,
      },
    },
  });
};
