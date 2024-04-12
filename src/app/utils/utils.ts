export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
};
export function isDefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}
