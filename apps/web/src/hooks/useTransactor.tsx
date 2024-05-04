"use client";

import { Hash } from "@/components/hash";
import { useAlert, useLoading } from "@/contexts";
import { getPublicClient } from "wagmi/actions";
import { getWagmiError } from "@/helpers";
import { Icon, Typography } from "@unidocs/ui";
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
) => (callback: () => Promise<WriteContractReturnType>) => Promise<void>;

const useTransactor: UseTransactor = ({
  onError,
  onStart,
  onSuccess,
  onFinish,
}) => {
  const alert = useAlert();
  const {
    startLoading: startWaitingConfirm,
    finishLoading: finishWaitingConfirm,
  } = useLoading({
    title: "Waiting for confirmation",
    body: (
      <Typography as="p" variant="p" className="text-center">
        Confirm this transaction in your wallet
      </Typography>
    ),
  });

  return async (callback) => {
    try {
      const client = getPublicClient(wagmiConfig);
      onStart && onStart();

      startWaitingConfirm();
      const hash = await callback();
      finishWaitingConfirm();

      alert({
        body: (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Icon name="ArrowUpRightFromCircle" size="3.75rem" />
            <Typography variant="h5" className="text-center">
              Transaction Submitted
            </Typography>
          </div>
        ),
      });

      client
        ?.waitForTransactionReceipt({
          hash,
        })
        .then((receipt) => {
          alert({
            body: (
              <SuccessAlert
                contractAddress={receipt?.to}
                txHash={receipt?.transactionHash}
              />
            ),
          });

          onSuccess && onSuccess();
        });
    } catch (err) {
      onError && onError(getWagmiError(err));
      finishWaitingConfirm();
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
    <div className="flex flex-col items-center justify-center space-y-3">
      <Icon name="CheckCircle" size="3.75rem" />
      <Typography variant="h5" className="text-center">
        Sent successsfully
      </Typography>
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
