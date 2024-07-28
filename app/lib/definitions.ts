// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    permission?: string;
};

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
    preset: string;
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