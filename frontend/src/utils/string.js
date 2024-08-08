export const lastName = (string) => {
  const nameSegments = string.split(" ");

  const name = nameSegments[nameSegments.length - 1];

  return name;
};
