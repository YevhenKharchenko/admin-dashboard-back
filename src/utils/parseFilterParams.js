const parseName = (name) => {
  const isString = typeof name === 'string';

  if (!isString) return;

  return name;
};

export const parseFilterParams = (query) => {
  const { name } = query;
  console.log(name);

  const parsedName = parseName(name);

  return {
    name: parsedName,
  };
};
