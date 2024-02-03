"use client";

import { getPublicClient } from "wagmi/actions";
import { getWagmiError } from "@/helpers";

type UseTransactorParams = {
  onError: (error: any) => void;
  onSuccess: () => void;
  onFinish: () => void;
};

type UseTransactor = (
  params: UseTransactorParams
) => (tx: () => Promise<any>) => Promise<void>;

const useTransactor: UseTransactor =
  ({ onError, onSuccess, onFinish }) =>
  async (tx) => {
    try {
      const { hash } = await tx();

      console.log(hash);

      // TODO: blockExplorerTxURL

      // console.log(transactionReceipt);
      onSuccess();
    } catch (err) {
      onError(getWagmiError(err));
    }

    onFinish();
  };

export { useTransactor };
