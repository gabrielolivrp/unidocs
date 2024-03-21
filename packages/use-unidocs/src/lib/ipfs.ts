import axios from "axios";
import { toast } from "sonner";

const base = axios.create({
  baseURL: "http://localhost:3005/api",
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
): Promise<{ [key: string]: { index: string; chunk: string } } | undefined> => {
  try {
    const { data } = await base.post("/get", {
      cids,
    });
    return data.chunks;
  } catch (error: any) {
    toast.error(error);
  }
};

export { storage, get };
