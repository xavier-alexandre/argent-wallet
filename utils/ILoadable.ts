/**
 * Conveniency interface for return values of
 * React hooks that fetch on-chain data
 */
interface ILoadable<Type> {
    value: Type,
    loading: boolean
}

export default ILoadable