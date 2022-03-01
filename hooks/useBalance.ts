import { BigNumber, BigNumberish } from "ethers";
import { useContext, useEffect, useState } from "react";
import EthersProviderContext from "../contexts/EthersProviderContext";
import ILoadable from "../utils/ILoadable";
import isAddressOrENS from "../utils/isAddressOrENS";

/**
 * A utility React hook that fetches the ETH balance
 * of passed address.
 * Gracioulsy handles invalid addresses.
 * Manages the loading state.
 */
const useBalance = (address: string): ILoadable<BigNumberish> => {
  const [balance, setBalance] = useState(BigNumber.from("0"));
  const [loading, setLoading] = useState(false);

  const provider = useContext(EthersProviderContext);

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (isAddressOrENS(address)) {
          setLoading(true);
          const b = await provider.getBalance(address);
          setBalance(b);
        } else {
          setBalance(BigNumber.from("0"));
        }
      } catch (error) {
        setBalance(BigNumber.from("0"));
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, [provider, address]);

  return {
    value: balance,
    loading,
  };
};

export default useBalance;
