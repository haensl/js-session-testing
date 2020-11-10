export const fetchStuff = () =>
  new Promise((resolve) => {
    resolve(['foo', 'bar', 'baz']);
  });

export default {
  fetchStuff
};
