import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Root = styled("div")({
  background: "#ff875b",
  color: "white",
  borderRadius: "12px",
  padding: "2rem",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
  },
});

const Card: React.FC<Props> = ({ title, children }) => (
  <Root>
    <Typography style={{ marginBottom: "1rem", opacity: "75%" }}>
      {title}
    </Typography>
    {children}
  </Root>
);

export default Card;
