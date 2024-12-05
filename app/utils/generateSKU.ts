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
    if (!text) {
        return ""
    }
    const alphanumericBrand = text?.replace(/[^a-zA-Z0-9]/g, "");
    return alphanumericBrand?.slice(0, numberOfCharacters).toUpperCase();
}

function generateModel(text: string): string {
    if (!text) {
        return ""
    }
    const words = text.split(" ");
    let code = "";

    for (const word of words) {
        if (/\d/.test(word)) {
            // code += word.replace(/[^0-9]/g, "");
            const wordArray = word.split("");
            wordArray.forEach((character, index) => {
                if (index === 0 || /\d|[A-Z]/.test(character)) {
                    code += character.toUpperCase();
                }
            })
        } else if (/^[A-Z]+$/.test(word)) {
            code += word;
        } else {
            code += word[0]?.toUpperCase();
        }
        if (code.length >= 5) break;
    }
    return code.slice(0, 5);
}


export const generateSKU = (productType: string, brand: string, model: string) => {
    const slicedBrand = sliceText(brand, 3);
    const slicedModel = generateModel(model);
    return (productType ? productTypes[productType] : "") + "-" + slicedBrand + "-" + slicedModel
}