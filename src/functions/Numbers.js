export const GetI_J_From_N = (n, dim) => {
  return [Math.floor(n / dim), n % dim];
};
