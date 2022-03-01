import { Skeleton, Typography } from "@mui/material";
import { utils } from "ethers";
import React from "react";
import useERC20Tokens from "../hooks/useERC20Tokens";
import Card from "./Card";

interface Props {
  address: string;
}

const ERC20Tokens: React.FC<Props> = ({ address }) => {
  const { value: tokens, loading } = useERC20Tokens(address);

  return (
    <Card title="ERC20 tokens">
      {loading ? (
        <>
          <Typography variant="h3">
            <Skeleton />
          </Typography>
          <Typography variant="h3">
            <Skeleton />
          </Typography>
          <Typography variant="h3">
            <Skeleton />
          </Typography>
        </>
      ) : (
        tokens
          .sort((a, b) => a.symbol.localeCompare(b.symbol))
          .map((token) => (
            <div
              key={token.address}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <Typography variant="h3">
                {Number(
                  utils.formatUnits(token.balance, token.decimal)
                ).toFixed(2)}
              </Typography>
              <Typography variant="h3">{token.symbol}</Typography>
            </div>
          ))
      )}
    </Card>
  );
};

export default ERC20Tokens;
