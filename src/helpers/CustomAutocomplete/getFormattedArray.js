export const getFormattedArray = (array, key) => {
  const arrayFormatted = array.map((item) => ({
    label: item[key],
    value: item[key],
  }));
  return arrayFormatted;
};
