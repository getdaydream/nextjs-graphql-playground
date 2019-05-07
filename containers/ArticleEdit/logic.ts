import { rootStore } from '@/stores';
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
  const { setArticle } = rootStore.articleEdit!;
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
  setArticle(updateArticle);
};

export const createArticle = async (article: CreateArticleInput) => {
  const { setArticle } = rootStore.articleEdit!;
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
  setArticle(createArticle);
};

export const pushlishArticle = async () => {
  const { draft } = rootStore.articleEdit!;
  await gqClient.mutate<
    IMutationUpdateArticle,
    IMutationUpdateArticleVariables
  >({
    mutation: MutationUpdateArticle,
    variables: {
      updateArticleInput: {
        id: draft.id!,
        status: ArticleStatusEnum.Published,
      },
    },
  });
  rootStore.destoryArticleEdit();
};
