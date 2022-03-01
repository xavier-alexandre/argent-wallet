import { createContext } from "react";

/**
 * Stores contracts instanciated by ethers with
 * "new ethers.Contract(address, abi, provider)"
 * and pass them down the component tree for reuse
 * in custom hooks
 */
const ContractsContext = createContext();

export default ContractsContext;
