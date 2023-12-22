import { WriteContractResult, getPublicClient } from "wagmi/actions";
import { getWagmiError } from "@/utils";

type UseTransactorParams = {
  onError: (error: any) => void;
  onSuccess: () => void;
  onFinish: () => void;
};

type UseTransactor = (
  params: UseTransactorParams
) => (tx: () => Promise<WriteContractResult>) => Promise<void>;

const useTransactor: UseTransactor =
  ({ onError, onSuccess, onFinish }) =>
  async (tx) => {
    try {
      const publicClient = getPublicClient();

      const { hash } = await tx();
      const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      // TODO: blockExplorerTxURL

      console.log(transactionReceipt);
      onSuccess();
    } catch (err) {
      onError(getWagmiError(err));
    }

    onFinish();
  };

export { useTransactor };
