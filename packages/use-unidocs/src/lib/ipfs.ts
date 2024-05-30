import axios from "axios";
import { toast } from "sonner";

const ipfs = (baseURL: string) => {
  const base = axios.create({
    baseURL: baseURL,
  });

  const storage = async (chunks: {
    [key: string]: string;
  }): Promise<{ [key: string]: string } | undefined> => {
    try {
      const { data } = await base.post("/storage", { chunks });
      return data.cids;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const get = async (
    cids: string[]
  ): Promise<
    { [key: string]: { index: string; chunk: string } } | undefined
  > => {
    try {
      const { data } = await base.post("/get", {
        cids,
      });
      return data.chunks;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return { get, storage };
};
export default ipfs;
