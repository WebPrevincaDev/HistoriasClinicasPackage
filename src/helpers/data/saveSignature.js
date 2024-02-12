import { FilesFirmaManager } from "../../data/FilesFirmaManager";

const sFiles = new FilesFirmaManager();

export const saveSignature = async (firma) => {
  const firmaId = await sFiles.save_firma(firma, "png");
  console.log("saveSignature firmaId", firmaId); // "b27d229c-eda5-5784-a572-e210de639d31"
  return firmaId;
};
