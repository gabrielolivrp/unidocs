import crypto from "crypto";

const generateChecksum = async (file: File): Promise<string> => {
  const hash = crypto.createHash("md5");
  const reader = new FileReader();
  const chunkSize = 2097152; // 2MB
  let cursor = 0;

  function moveCursor(chunkStart: number) {
    const chunkEnd = Math.min(file.size, chunkStart + chunkSize);
    reader.readAsText(file.slice(chunkStart, chunkEnd));
  }

  reader.onerror = function () {
    throw new Error("Failed to compute md5");
  };

  reader.onload = function (e: any) {
    hash.update(e.target.result);
    cursor += chunkSize;

    if (cursor < file.size) {
      moveCursor(cursor);
    }
  };

  moveCursor(0);

  return new Promise((resolve, reject) => {
    reader.onloadend = function () {
      resolve(hash.digest("hex"));
    };
  });
};

export { generateChecksum };
