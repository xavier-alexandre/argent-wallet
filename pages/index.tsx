import { ethers } from "ethers";
import Main from "../components/Main";
import EthersProviderContext from "../contexts/EthersProviderContext";
import ContractsContext from "../contexts/ContractsContext";
import GuardianManager_ABI from "../abis/GuardianManager_ABI.json";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: "Barlow, Arial",
    h3: {
      fontWeight: 600,
    },
  },
});

const Home = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/7d0d81d0919f4f05b9ab6634be01ee73"
  );

  const guardianManager = new ethers.Contract(
    "0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7",
    GuardianManager_ABI,
    provider
  );

  return (
    <EthersProviderContext.Provider value={provider}>
      <ContractsContext.Provider value={{ guardianManager }}>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </ContractsContext.Provider>
    </EthersProviderContext.Provider>
  );
};

export default Home;
