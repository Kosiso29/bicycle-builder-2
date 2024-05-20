export function CurrencyFormatter(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value).replace(/\$/, "");
}
