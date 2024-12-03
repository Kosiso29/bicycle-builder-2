const productTypes: any = {
    "Frame Set": 'FS',
    "Wheel": 'WH',
    "Tyre": 'TY',
    "Stem": 'ST',
    "Handle Bar": 'HB',
    "Group Set": 'GS',
    "Saddle": 'SD',
}

const sliceText = (text: string, numberOfCharacters: number) => {
    const alphanumericBrand = text?.replace(/[^a-zA-Z0-9]/g, "");
    return alphanumericBrand?.slice(0, numberOfCharacters).toUpperCase();
}

export const generateSKU = (productType: string, brand: string, model: string) => {
    const slicedBrand = sliceText(brand, 3);
    const slicedModel = sliceText(model, 5);
    return (productType ? productTypes[productType] : "") + "-" + slicedBrand + "-" + slicedModel
}