import { BigNumberish } from "ethers";
import { useContext, useEffect, useState } from "react";
import ILoadable from "../utils/ILoadable";
import isAddressOrENS from "../utils/isAddressOrENS";
import ContractsContext from "../contexts/ContractsContext";

/**
 * A utility React hook that fetches the number
 * of guardians of passed Argent wallet.
 * Gracioulsy handles invalid addresses.
 * Manages the loading state.
 */
const useNumberOfGuardians = (address: string): ILoadable<BigNumberish> => {
  const [numberOfGuardians, setNumberOfGuardians] = useState(0);
  const [loading, setLoading] = useState(false);

  const { guardianManager } = useContext(ContractsContext);

  useEffect(() => {
    const getNumberOfGuardians = async () => {
      try {
        if (isAddressOrENS(address)) {
          setLoading(true);
          const n = await guardianManager.guardianCount(address);
          setNumberOfGuardians(n);
        } else {
          setNumberOfGuardians(0);
        }
      } catch (error) {
        setNumberOfGuardians(0);
      } finally {
        setLoading(false);
      }
    };
    getNumberOfGuardians();
  }, [guardianManager, address]);

  return {
    value: numberOfGuardians,
    loading,
  };
};

export default useNumberOfGuardians;
