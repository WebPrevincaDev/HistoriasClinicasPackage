import fileManagerInstance from "../../data/fileManagerInstance";

// getAll renamed to getAllByKey
export const getAllByKey = async (key) => {
  const res = await fileManagerInstance.getItem(key);
  return !!res ? JSON.parse(res) : [];
};
