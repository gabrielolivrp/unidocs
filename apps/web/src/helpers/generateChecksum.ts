import crypto from "crypto";

async function generateChecksum(file: File): Promise<string> {
  const hash = crypto.createHash("md5");
  const reader = new FileReader();
  const chunkSize = 2097152; // Read in chunks of 2MB
  let cursor = 0; // current cursor in file

  function moveCursor(chunkStart: number): void {
    const chunkEnd = Math.min(file.size, chunkStart + chunkSize);
    reader.readAsText(file.slice(chunkStart, chunkEnd));
  }

  reader.onerror = function (): void {
    throw new Error("Failed to compute MD5 - error reading file");
  };

  reader.onload = function (e: any): void {
    hash.update(e.target.result); // Accumulate chunk to md5 computation
    cursor += chunkSize; // Move past this chunk

    if (cursor < file.size) {
      // Enqueue next chunk to be accumulated
      moveCursor(cursor);
    }
  };

  moveCursor(0);

  return new Promise((resolve, reject) => {
    reader.onloadend = function (): void {
      resolve(hash.digest("hex"));
    };
  });
}

export { generateChecksum };
