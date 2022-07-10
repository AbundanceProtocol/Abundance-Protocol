
export function shortenAddress(address) {
    if (!address || typeof address === 'undefined') return '';

    return address.slice(0, 5) + '...' + address.slice(38, 42)
}