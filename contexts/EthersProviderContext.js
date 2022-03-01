import { createContext } from "react";

/**
 * Stores the ethers provider and pass it down
 * the component tree for reuse in custom hooks
 */
const EthersProviderContext = createContext();

export default EthersProviderContext;
