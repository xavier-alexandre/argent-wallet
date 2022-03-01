import axios from "axios";
import { BigNumber, BigNumberish } from "ethers";
import { useContext, useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import EthersProviderContext from "../contexts/EthersProviderContext";
import ILoadable from "../utils/ILoadable";
import isAddressOrENS from "../utils/isAddressOrENS";

interface ITokenBalance {
  name: string;
  symbol: string;
  balance: BigNumber;
  address: string;
  decimal: string;
}

/**
 * A utility React hook that fetches the ETH balance
 * of passed address.
 * Gracioulsy handles invalid addresses.
 * Manages the loading state.
 */
const useERC20Tokens = (address: string): ILoadable<Array<ITokenBalance>> => {
  const provider = useContext(EthersProviderContext);
  const [balances, setBalances] = useState<Array<ITokenBalance>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTokens = async () => {
      try {
        if (isAddressOrENS(address)) {
          setLoading(true);

          const response = await axios.get("https://api.etherscan.io/api", {
            params: {
              module: "account",
              action: "tokentx",
              address,
              sort: "asc",
              apikey: "2DZAAF7QJ88ZWJ2KGXDQKDY7X3PQTU1YRT",
            },
          });
          const events = response.data.result;

          // Group events by token contract
          const byToken = groupBy(events, "contractAddress");

          // For a given token, reduce all events,
          // adding the transferred amount to the balance if the token was sent TO the address
          // or removing the transferred amount from the balance if the token was sent FROM the address
          const balances = Object.values(byToken).map((eventsByToken: any) =>
            eventsByToken.reduce(
              (prev: any, cur: any) => ({
                ...prev,
                balance:
                  cur.to.toLowerCase() === address.toLowerCase()
                    ? prev.balance.add(BigNumber.from(cur.value))
                    : prev.balance.sub(BigNumber.from(cur.value)),
              }),
              {
                name: eventsByToken[0].tokenName,
                symbol: eventsByToken[0].tokenSymbol,
                address: eventsByToken[0].contractAddress,
                decimal: eventsByToken[0].tokenDecimal,
                balance: BigNumber.from(0),
              }
            )
          );

          setBalances(balances);
        } else {
          setBalances([]);
        }
      } catch (error) {
        setBalances([]);
      } finally {
        setLoading(false);
      }
    };
    getTokens();
  }, [provider, address]);

  return {
    value: balances,
    loading,
  };
};

export default useERC20Tokens;
