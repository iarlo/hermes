// https://stackoverflow.com/a/43674389
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    constructor;
  };
}

export { staticImplements };
