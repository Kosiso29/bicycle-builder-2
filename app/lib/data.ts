import { QueryResultRow, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from "next/cache";

// Types
import { Models } from "@/app/lib/definitions";

export async function fetchModels(): Promise<Models> {
    noStore();
    try {
        const data = await sql`
        SELECT
            c.name AS category,
            b.name AS brand,
            m.name AS model,
            m.id,
            m.image_url AS src,
            m.actual_width AS "actualWidth",
            m.has_stem AS "hasStem",
            m.has_handle_bar AS "hasHandleBar",
            m.stem_x AS "stemX",
            m.stem_y AS "stemY",
            m.saddle_x AS "saddleX",
            m.saddle_y AS "saddleY",
            m.front_wheel_x AS "frontWheelSetX",
            m.front_wheel_y AS "frontWheelSetY",
            m.back_wheel_x AS "backWheelSetX",
            m.back_wheel_y AS "backWheelSetY",
            m.groupset_drivetrain_x AS "groupSet_drivetrainX",
            m.groupset_drivetrain_y AS "groupSet_drivetrainY",
            m.groupset_shifter_x AS "groupSet_shifterX",
            m.groupset_shifter_y AS "groupSet_shifterY",
            m.price,
            m.key_metrics,
            m.aerodynamics,
            m.weight,
            m.comfort,
            m.stiffness,
            m.overall,
            m.best_aerodynamics,
            m.best_lightweight
        FROM
            categories c
        JOIN
            models m ON c.id = m.category_id
        JOIN
            brands b ON m.brand_id = b.id
        ORDER BY
            b.name, m.name;`;

        const models = data.rows.map((model: QueryResultRow) => ({
            ...model
        })) as Models;
        return models;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the models.');
    }
}

export async function fetchCategories() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM categories;`;

        const categories = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return categories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the categories.');
    }
}

export async function fetchBrands() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM brands;`;

        const brands = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return brands;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the brands.');
    }
}

export async function fetchModelById(id: string) {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM models
        WHERE models.id = ${id};
        `

        const model = data.rows[0];

        return model;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch the model.');
    }
}