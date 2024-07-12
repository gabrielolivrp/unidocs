import { fileToBase64 } from "./file-to-base64";

const splitFile = async (file: File): Promise<string[]> => {
  const base64 = await fileToBase64(file);
  const chunkSize = Math.ceil(base64.length / 5);
  const chunks = [];
  for (let i = 0; i < base64.length; i += chunkSize) {
    chunks.push(base64.slice(i, i + chunkSize));
  }
  return chunks;
};

export { splitFile }
