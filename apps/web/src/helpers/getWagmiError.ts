const getWagmiError = (err: Error | any): string => {
  console.error(err)
  if (err.details) {
    return err.details;
  } else if (err.shortMessage) {
    return err.shortMessage;
  } else if (err.message) {
    return err.message;
  } else if (err.name) {
    return err.name;
  }

  return err.message ?? "An unknown error occurred";
};

export { getWagmiError };
