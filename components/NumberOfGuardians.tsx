import { Skeleton, Typography } from "@mui/material";
import { utils } from "ethers";
import React from "react";
import useNumberOfGuardians from "../hooks/useNumberOfGuardians";
import Card from "./Card";

interface Props {
  address: string;
}

const NumberOfGuardians: React.FC<Props> = ({ address }) => {
  const { value: numberOfGuardians, loading } = useNumberOfGuardians(address);

  return (
    <Card title="Number of guardians">
      <Typography variant="h3">
        {loading ? <Skeleton /> : utils.formatUnits(numberOfGuardians, "wei")}
      </Typography>
    </Card>
  );
};

export default NumberOfGuardians;
