const ADDRESS_OR_ENS_REGEX = /(0x[a-zA-Z0-9]{40}|.*.eth)/; // Matches "0x....." or "xxxx.eth"

const isAddressOrENS = (address: string): boolean =>
    ADDRESS_OR_ENS_REGEX.test(address);

export default isAddressOrENS