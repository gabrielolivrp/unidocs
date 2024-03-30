"use client";

import { Hash } from "@/components/hash";
import { useAlert, useLoading } from "@/contexts";
import { getPublicClient } from "wagmi/actions";
import { getWagmiError } from "@/helpers";
import { Typography } from "@unidocs/ui";
import { Address, WriteContractReturnType } from "viem";
import { wagmiConfig } from "@/config";

type UseTransactorParams = {
  onStart?: () => void;
  onFinish?: () => void;
  onError?: (error: any) => void;
  onSuccess?: () => void;
};

type UseTransactor = (
  params: UseTransactorParams
) => (tx: () => Promise<WriteContractReturnType>) => Promise<void>;

const useTransactor: UseTransactor = ({
  onError,
  onStart,
  onSuccess,
  onFinish,
}) => {
  const alert = useAlert();
  const {
    startLoading: startConfirmLoading,
    finishLoading: finishConfirmLoading,
  } = useLoading({
    message: "Confirming transaction",
  });
  const {
    startLoading: startWaitingLoading,
    finishLoading: finishWaitingLoading,
  } = useLoading({
    message: "Waiting for transaction to complete.",
  });
  return async (fn) => {
    try {
      const client = getPublicClient(wagmiConfig);
      onStart && onStart();

      startConfirmLoading();
      const hash = await fn();
      finishConfirmLoading();

      startWaitingLoading();
      const receipt = await client?.waitForTransactionReceipt({
        hash,
      });
      finishWaitingLoading();

      alert({
        variant: "success",
        message: (
          <SuccessAlert
            contractAddress={receipt?.to}
            txHash={receipt?.transactionHash}
            gasUsed={receipt?.gasUsed}
          />
        ),
      });

      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(getWagmiError(err));
      finishConfirmLoading();
      finishWaitingLoading();
    }

    onFinish && onFinish();
  };
};

interface SuccessAlertProps {
  txHash?: Address;
  contractAddress?: Address | null;
  gasUsed?: bigint;
}

const SuccessAlert = ({
  txHash,
  contractAddress,
  gasUsed,
}: SuccessAlertProps) => (
  <>
    <div className="flex justify-center">
      <Typography variant="h4">Sent successsfully</Typography>
    </div>
    <div className="bg-secondary rounded-lg p-1">
      <table className="table w-full">
        <tbody>
          {!!txHash && (
            <tr>
              <td className="p-1">
                <Typography variant="p">Transaction hash</Typography>
              </td>
              <td className="p-1 text-right">
                <Hash text={txHash} />
              </td>
            </tr>
          )}
          {!!contractAddress && (
            <tr>
              <td className="p-1">
                <Typography variant="p">Contract Address</Typography>
              </td>
              <td className="p-1 text-right">
                <Hash text={contractAddress} />
              </td>
            </tr>
          )}
          {!!gasUsed && (
            <tr>
              <td className="p-1">
                <Typography variant="p">Fee</Typography>
              </td>
              <td className="p-1 text-right">
                <Typography variant="p">{Number(gasUsed)}ETH</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
);

export { useTransactor };
