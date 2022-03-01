import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import isAddressOrENS from "../utils/isAddressOrENS";
import ERC20Tokens from "./ERC20Tokens";
import NumberOfGuardians from "./NumberOfGuardians";
import WalletBalance from "./WalletBalance";

const Main = () => {
  const [address, setAddress] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "30rem",
        margin: "auto",
      }}
    >
      <Typography variant="h5">Enter a wallet address</Typography>
      <TextField
        variant="standard"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        error={!isAddressOrENS(address)}
        helperText="Ethereum address or ENS"
      />
      <WalletBalance address={address} />
      <NumberOfGuardians address={address} />
      <ERC20Tokens address={address} />
    </div>
  );
};

export default Main;
