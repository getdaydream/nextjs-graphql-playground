const SUFFIX_ARRAY = ['request', 'success', 'failure'];

export const createAsyncActionTypes = (
  namespace: string,
  actionName: string,
): [string, string, string] => {
  return SUFFIX_ARRAY.map(
    suffix => `@${namespace}/${actionName}/${suffix}`,
  ) as [string, string, string];
};
