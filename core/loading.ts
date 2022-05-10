interface Loading {
  createLoading: () => Promise<any>;
}
interface LoadingStatus {
  loading: Boolean;
}
export const useLoading = ({ createLoading }: Loading) => {
  const isLoading: LoadingStatus = { loading: true };

  const showLoading = (callBack: Promise<any>) => {
    changeLoadingStatus(true);
    return Promise.allSettled([callBack, createLoading()]).finally(() =>
      changeLoadingStatus(false)
    );
  };

  const changeLoadingStatus = (status: Boolean) => (isLoading.loading = status);

  return {
    showLoading,
    changeLoadingStatus,
  };
};
