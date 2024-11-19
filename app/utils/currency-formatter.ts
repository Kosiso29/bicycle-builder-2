export function CurrencyFormatter(value: number, currencyCode?: string, countryCode?: string) {
    return new Intl.NumberFormat('en-' + countryCode || 'US', { style: 'currency', currency: currencyCode || 'USD' }).format(value);
}
