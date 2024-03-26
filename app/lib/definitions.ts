export type Brand = {
    id: string;
    name: string
};

export type Brands = Brand[];

export type Category = {
    id: string;
    name: string
};

export type Categories = Category[];

export type Model = {
    id: string;
    category: string;
    brand: string;
    model: string;
    src: string;
    actualWidth: number;
    hasStem?: boolean;
    hasHandleBar?: boolean;
    stemX?: number;
    stemY?: number;
    saddleX?: number;
    saddleY?: number;
    frontWheelSetX?: number;
    frontWheelSetY?: number;
    backWheelSetX?: number;
    backWheelSetY?: number;
}

export type Models = Model[];