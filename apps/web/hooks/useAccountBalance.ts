import { useEffect, useState } from "react";
import { Address, useBalance } from "wagmi";

const useAccountBalance = (address: Address) => {
  const [balance, setBalance] = useState<number | null>(null);

  const {
    data: balanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
  });

  useEffect(() => {
    if (balanceData?.formatted) {
      setBalance(Number(balanceData.formatted));
    }
  }, [balanceData]);

  return { balance, isError, isLoading };
};

export { useAccountBalance };
