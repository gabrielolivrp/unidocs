const base64ToFile = (base64: string, filename: string, mimetype: string) => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimetype });
  return new File([blob], filename, { type: mimetype });
};

const joinFile = (chunks: string[], filename: string, mimetype: string) => {
  const base64 = chunks.join("");
  return base64ToFile(base64, filename, mimetype);
};

export { joinFile };
