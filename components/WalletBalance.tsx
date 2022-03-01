import React from "react";
import { utils } from "ethers";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import useBalance from "../hooks/useBalance";
import Card from "./Card";

interface Props {
  address: string;
}

const WalletBalance: React.FC<Props> = ({ address }) => {
  const { value: balance, loading } = useBalance(address);

  return (
    <Card title="Wallet balance">
      <Typography variant="h3">
        {loading ? (
          <Skeleton />
        ) : (
          Number(utils.formatEther(balance)).toFixed(4) + " ETH"
        )}
      </Typography>
    </Card>
  );
};

export default WalletBalance;
